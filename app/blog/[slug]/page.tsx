import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Shell } from "@/components/shell";
import { FollowCard } from "@/components/follow-card";
import { SiteFooter } from "@/components/site-footer";
import { formatDate, getPost, getPosts, getTeasers } from "@/lib/blog";
import { BIO } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — kirillorlov.pro`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <Shell page="blog" posts={getTeasers()}>
      <article className="post">
        <header className="page-head">
          <div className="eyebrow">
            # Blog · {formatDate(post.date)} · {post.minutes} min read
          </div>
          <h1>{post.title}</h1>
          {post.summary && <p>{post.summary}</p>}
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="author-card">
          <Image src="/photo.jpg" alt="" width={56} height={56} />
          <div>
            <div style={{ color: "var(--text-primary)", fontWeight: 600 }}>{BIO.name}</div>
            <div>
              Engineering lead in Berlin. I run Kubernetes on bare metal at home and write
              down what breaks.
            </div>
            <div className="author-card-links">
              <a href="/">About me</a>
              <a href={`https://${BIO.github}`}>GitHub</a>
              <a href={`https://${BIO.linkedin}`}>LinkedIn</a>
            </div>
          </div>
        </aside>

        <div className="post-end">
          <a href="/blog">← All posts</a>
          <a href="/blog/feed.xml">RSS</a>
        </div>
      </article>

      <FollowCard />

      <SiteFooter />
    </Shell>
  );
}
