import type { Metadata } from "next";
import { Shell } from "@/components/shell";
import { FollowCard } from "@/components/follow-card";
import { SiteFooter } from "@/components/site-footer";
import { WritingList } from "@/components/sections";
import { getTeasers } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — kirillorlov.pro",
  description: "Notes from running Kubernetes on bare metal at home, and what broke.",
  alternates: { types: { "application/rss+xml": "/blog/feed.xml" } },
};

export default function BlogIndexPage() {
  const posts = getTeasers();
  return (
    <Shell page="blog" posts={posts}>
      <header className="page-head">
        <div className="eyebrow"># Writing</div>
        <h1>Notes from running Kubernetes on bare metal at home, and what broke.</h1>
        <p>
          Incidents, upgrades and side projects from my homelab: what the symptom was, what I
          guessed wrong, and what fixed it.
        </p>
      </header>

      <div className="list-head">
        <span>{posts.length === 1 ? "1 post" : `${posts.length} posts`}</span>
        <span className="rule" />
        <span>newest first</span>
      </div>

      {posts.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>Nothing published yet.</p>
      ) : (
        <WritingList posts={posts} />
      )}

      <FollowCard />

      <SiteFooter />
    </Shell>
  );
}
