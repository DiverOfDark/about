import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { formatDate, getPost, getPosts } from "@/lib/blog";
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
    <LegalPage
      title={post.title}
      eyebrow={`Blog · ${formatDate(post.date)}`}
      lang="en"
      backHref="/blog"
      otherLegalLink={{ href: "/impressum", label: "Impressum" }}
    >
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
            <a href="/blog">More posts</a>
            <a href={`https://${BIO.github}`}>GitHub</a>
            <a href={`https://${BIO.linkedin}`}>LinkedIn</a>
            <a href="/blog/feed.xml">RSS</a>
          </div>
        </div>
      </aside>
    </LegalPage>
  );
}
