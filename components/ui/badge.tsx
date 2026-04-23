import type { CSSProperties, ReactNode } from "react";

type Variant = "default" | "accent" | "muted" | "ready";

type Props = {
  children: ReactNode;
  variant?: Variant;
  style?: CSSProperties;
};

const variants: Record<Variant, CSSProperties> = {
  default: { borderColor: "var(--border-strong)", color: "var(--text-primary)" },
  accent: { borderColor: "var(--accent-muted)", color: "var(--accent)" },
  muted: {
    borderColor: "var(--border)",
    background: "var(--bg-surface)",
    color: "var(--text-secondary)",
  },
  ready: {
    borderColor: "oklch(55% 0.10 145 / 0.5)",
    color: "var(--status-ready)",
  },
};

export function Badge({ children, variant = "default", style }: Props) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: ".1em",
        padding: "2px 7px",
        borderRadius: 2,
        border: "1px solid",
        lineHeight: 1.5,
        textTransform: "uppercase",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
