import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal-page";
import { formatDate, getPost, getPosts } from "@/lib/blog";

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
    </LegalPage>
  );
}
