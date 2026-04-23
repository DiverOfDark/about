"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Icon } from "./ui/icon";
import { StatusDot } from "./ui/status-dot";
import { btnP, btnI, btnGhost, kbdTiny } from "./shared";
import { BIO, type Tweaks } from "@/lib/data";

type Props = {
  tweaks: Tweaks;
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
  clockLabel: string;
  availabilityTag: string;
  onCopyEmail: () => void;
  onOpenCommand: () => void;
  onOpenTweaks: () => void;
};

export function Rail({
  tweaks,
  setTweak,
  clockLabel,
  availabilityTag,
  onCopyEmail,
  onOpenCommand,
  onOpenTweaks,
}: Props) {
  return (
    <aside className="rail">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Image src="/logo.png" alt="" width={16} height={16} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: ".06em",
            color: "var(--text-secondary)",
          }}
        >
          kirillorlov.pro
        </span>
      </div>

      <div style={{ position: "relative", width: 120, height: 120 }}>
        <Image
          src="/photo.jpg"
          alt={BIO.name}
          width={120}
          height={120}
          priority
          style={{
            width: 120,
            height: 120,
            borderRadius: 4,
            objectFit: "cover",
            display: "block",
            border: "1px solid var(--border-strong)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 10,
            height: 10,
            background: "var(--accent)",
          }}
        />
      </div>

      <div>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            fontFamily: "var(--font-heading)",
            margin: 0,
          }}
        >
          Kirill Orlov
        </h1>
        <div
          style={{
            marginTop: 6,
            fontSize: 13,
            color: "var(--text-secondary)",
            fontWeight: 300,
            lineHeight: 1.5,
          }}
        >
          VP @ Solactive. Fourteen years of Java, Kubernetes, and CI/CD.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          fontSize: 12.5,
        }}
      >
        <Kv k="ROLE" v={BIO.role} />
        <Kv
          k="WHERE"
          v={
            <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
              <Icon name="pin" size={11} /> {BIO.location}
            </span>
          }
        />
        <Kv
          k="CLOCK"
          v={
            <span style={{ fontFamily: "var(--font-mono)" }}>{clockLabel}</span>
          }
        />
        <Kv
          k="STATUS"
          v={
            <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <StatusDot
                status={tweaks.availability === "not-looking" ? "stopped" : "ready"}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: ".1em",
                }}
              >
                {availabilityTag}
              </span>
            </span>
          }
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <a href="/cv.pdf" style={btnP}>
          <Icon name="download" size={13} /> Download CV
        </a>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 6,
          }}
        >
          <button onClick={onCopyEmail} style={btnI} title="Copy email">
            <Icon name="mail" size={14} />
          </button>
          <a
            href={`https://${BIO.github}`}
            target="_blank"
            rel="noreferrer"
            style={btnI}
            title="GitHub"
          >
            <Icon name="github" size={14} />
          </a>
          <a
            href={`https://${BIO.linkedin}`}
            target="_blank"
            rel="noreferrer"
            style={btnI}
            title="LinkedIn"
          >
            <Icon name="linkedin" size={14} />
          </a>
        </div>
        <button onClick={onOpenCommand} style={btnGhost}>
          <Icon name="command" size={12} />
          <span style={{ flex: 1, textAlign: "left" }}>Search · jump · copy…</span>
          <kbd style={kbdTiny}>⌘K</kbd>
        </button>
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 18,
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button
            className="rail-btn"
            onClick={() => setTweak("theme", tweaks.theme === "dark" ? "light" : "dark")}
            title="Toggle theme (t)"
          >
            <Icon name={tweaks.theme === "dark" ? "sun" : "moon"} size={13} />
            <span>{tweaks.theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button className="rail-btn" onClick={onOpenTweaks} title="Tweaks">
            <Icon name="settings" size={13} />
            <span>Tweaks</span>
          </button>
        </div>
        <div
          style={{
            marginTop: 12,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-tertiary)",
            letterSpacing: ".08em",
          }}
        >
          NODE · kirill-01 &nbsp;·&nbsp; BUILD · 2026.04
        </div>
      </div>
    </aside>
  );
}

type KvProps = {
  k: string;
  v: ReactNode;
};

function Kv({ k, v }: KvProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "60px 1fr",
        gap: 10,
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9.5,
          letterSpacing: ".14em",
          color: "var(--text-tertiary)",
        }}
      >
        {k}
      </span>
      <span style={{ color: "var(--text-primary)" }}>{v}</span>
    </div>
  );
}
