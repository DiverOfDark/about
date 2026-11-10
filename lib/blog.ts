import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export const SITE_URL = "https://kirillorlov.pro";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  html: string;
};

export type PostTeaser = Pick<Post, "slug" | "title" | "summary"> & { dateLabel: string };

function parseFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^(["'])(.*)\1$/, "$2");
  }
  return { meta, body: raw.slice(match[0].length) };
}

// Drafts render in `next dev` only, so a post can be previewed before it is published.
const showDrafts = process.env.NODE_ENV !== "production";

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { meta, body } = parseFrontMatter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8"));
      return { file, meta, body };
    })
    .filter(({ meta }) => showDrafts || meta.status !== "draft")
    .map(({ file, meta, body }) => ({
      slug: file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
      title: meta.title ?? file,
      date: meta.date ?? "",
      summary: meta.summary ?? "",
      html: marked.parse(body, { async: false }),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function getTeasers(limit: number): PostTeaser[] {
  return getPosts()
    .slice(0, limit)
    .map(({ slug, title, summary, date }) => ({ slug, title, summary, dateLabel: formatDate(date) }));
}
