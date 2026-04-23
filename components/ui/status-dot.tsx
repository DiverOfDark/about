import type { CSSProperties } from "react";

export type Status =
  | "ready"
  | "degraded"
  | "error"
  | "pending"
  | "stopped"
  | "building";

type Props = {
  status?: Status;
  size?: number;
};

const styles: Record<Status, CSSProperties> = {
  ready: { background: "var(--status-ready)" },
  degraded: { background: "var(--status-degraded)" },
  error: { background: "var(--status-error)" },
  pending: {
    background: "var(--status-pending)",
    animation: "abPulse 1.4s ease-in-out infinite",
  },
  stopped: { background: "transparent", border: "1.5px solid var(--status-stopped)" },
  building: {
    background: "var(--status-building)",
    animation: "abPulse 1.4s ease-in-out infinite",
  },
};

export function StatusDot({ status = "ready", size = 8 }: Props) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        ...styles[status],
      }}
    />
  );
}
