import { Icon } from "./ui/icon";
import { btnI, btnP } from "./shared";
import { BIO } from "@/lib/data";

/** Closing block on blog pages: where new posts show up. */
export function FollowCard() {
  return (
    <section className="follow-card">
      <div>
        <div className="eyebrow" style={{ marginBottom: 8 }}>
          # Follow
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "var(--font-heading)" }}>
          New posts land in the RSS feed first.
        </div>
        <div style={{ marginTop: 6, fontSize: 13.5, fontWeight: 300, color: "var(--text-secondary)" }}>
          I also share each one on LinkedIn, which is the place to argue with me about it.
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <a href="/blog/feed.xml" style={{ ...btnP, padding: "9px 16px" }}>
          RSS feed
        </a>
        <a
          href={`https://${BIO.linkedin}`}
          target="_blank"
          rel="noreferrer"
          style={{ ...btnI, gap: 8, padding: "9px 16px", fontSize: 12.5, fontWeight: 500, textDecoration: "none" }}
        >
          <Icon name="linkedin" size={13} /> LinkedIn
        </a>
      </div>
    </section>
  );
}
