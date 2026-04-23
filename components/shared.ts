import type { CSSProperties } from "react";

export const btnP: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "9px 12px",
  border: "1px solid var(--accent)",
  background: "var(--accent)",
  color: "var(--accent-fg)",
  borderRadius: 4,
  fontFamily: "var(--font-body)",
  fontSize: 12.5,
  fontWeight: 500,
  textDecoration: "none",
  cursor: "pointer",
};

export const btnI: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 0",
  border: "1px solid var(--border-strong)",
  background: "transparent",
  color: "var(--text-primary)",
  borderRadius: 4,
  cursor: "pointer",
};

export const btnGhost: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 10px",
  border: "1px solid var(--border)",
  background: "var(--bg-surface)",
  color: "var(--text-secondary)",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 11.5,
  fontFamily: "var(--font-body)",
};

export const kbdTiny: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 9.5,
  padding: "1px 5px",
  border: "1px solid var(--border-strong)",
  borderRadius: 2,
  color: "var(--text-secondary)",
  letterSpacing: ".04em",
};

export const kbdS: CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 9.5,
  padding: "2px 5px",
  border: "1px solid var(--border-strong)",
  borderRadius: 2,
  color: "var(--text-secondary)",
  letterSpacing: ".04em",
};
