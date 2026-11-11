"use client";

import { useEffect, useState } from "react";
import { StatusDot } from "./ui/status-dot";
import { kbdTiny } from "./shared";
import { DENSITY } from "@/lib/data";
import { useShell } from "./shell";

const link = { color: "var(--text-tertiary)", textDecoration: "none" } as const;

export function SiteFooter() {
  const { tweaks, posts } = useShell();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      style={{
        marginTop: DENSITY[tweaks.density].gap,
        paddingTop: 20,
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        fontFamily: "var(--font-mono)",
        fontSize: 10.5,
        color: "var(--text-tertiary)",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <span>© {year ?? ""} Kirill Orlov · Berlin, DE</span>
      <span style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        {posts.length > 0 && (
          <a href="/blog" style={link}>
            Blog
          </a>
        )}
        <a href="/impressum" style={link}>
          Impressum
        </a>
        <a href="/datenschutz" style={link}>
          Datenschutz
        </a>
        <span style={{ whiteSpace: "nowrap" }}>
          press <kbd style={kbdTiny}>?</kbd> for shortcuts
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StatusDot status="ready" /> service operational
        </span>
      </span>
    </footer>
  );
}
