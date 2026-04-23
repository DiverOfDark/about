import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "./ui/icon";

type Props = {
  title: string;
  lang?: string;
  children: ReactNode;
  otherLegalLink: { href: string; label: string };
};

export function LegalPage({ title, lang = "de", children, otherLegalLink }: Props) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--text-primary)",
          }}
        >
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
        </Link>
        <span style={{ flex: 1 }} />
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 10px",
            border: "1px solid var(--border-strong)",
            borderRadius: 4,
            textDecoration: "none",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: ".06em",
            textTransform: "uppercase",
          }}
        >
          <Icon name="arrow" size={12} style={{ transform: "rotate(180deg)" }} />
          {lang === "de" ? "Zurück" : "Back"}
        </Link>
      </header>

      <main
        lang={lang}
        style={{
          width: "100%",
          maxWidth: 720,
          margin: "0 auto",
          padding: "56px 32px 48px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            letterSpacing: ".14em",
            color: "var(--text-tertiary)",
            marginBottom: 14,
            textTransform: "uppercase",
          }}
        >
          # {title}
        </div>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.12,
            fontFamily: "var(--font-heading)",
            margin: 0,
          }}
        >
          {title}
        </h1>

        <div style={{ marginTop: 32 }}>{children}</div>
      </main>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          color: "var(--text-tertiary)",
          letterSpacing: ".04em",
        }}
      >
        <span>Kirill Orlov · Berlin, DE</span>
        <span style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Link
            href={otherLegalLink.href}
            style={{ color: "var(--text-tertiary)", textDecoration: "none" }}
          >
            {otherLegalLink.label}
          </Link>
          <Link
            href="/"
            style={{ color: "var(--text-tertiary)", textDecoration: "none" }}
          >
            Home
          </Link>
        </span>
      </footer>
    </div>
  );
}

type LegalSectionProps = {
  heading: string;
  children: ReactNode;
};

export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <section style={{ marginTop: 32 }}>
      <h2
        style={{
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          fontFamily: "var(--font-heading)",
          margin: 0,
          marginBottom: 12,
        }}
      >
        {heading}
      </h2>
      <div
        style={{
          fontSize: 14,
          color: "var(--text-secondary)",
          fontWeight: 300,
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </section>
  );
}
