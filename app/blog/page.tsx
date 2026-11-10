import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { formatDate, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — kirillorlov.pro",
  description: "Notes from running Kubernetes on bare metal at home, and what broke.",
  alternates: { types: { "application/rss+xml": "/blog/feed.xml" } },
};

export default function BlogIndexPage() {
  const posts = getPosts();
  return (
    <LegalPage
      title="Blog"
      lang="en"
      otherLegalLink={{ href: "/blog/feed.xml", label: "RSS" }}
    >
      {posts.length === 0 && (
        <p style={{ color: "var(--text-secondary)" }}>Nothing published yet.</p>
      )}
      {posts.map((post) => (
        <article key={post.slug} style={{ marginTop: 28 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: ".08em",
              color: "var(--text-tertiary)",
              textTransform: "uppercase",
            }}
          >
            {formatDate(post.date)}
          </div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              fontFamily: "var(--font-heading)",
              margin: "6px 0 0",
            }}
          >
            <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              {post.title}
            </Link>
          </h2>
          {post.summary && (
            <p
              style={{
                margin: "8px 0 0",
                fontSize: 14,
                color: "var(--text-secondary)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              {post.summary}
            </p>
          )}
        </article>
      ))}
    </LegalPage>
  );
}
