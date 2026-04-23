"use client";

import { Icon } from "./ui/icon";
import type { Tweaks } from "@/lib/data";

type Props = {
  tweaks: Tweaks;
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
  onClose: () => void;
};

export function TweaksPanel({ tweaks, setTweak, onClose }: Props) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 280,
        zIndex: 999,
        background: "var(--bg-overlay)",
        border: "1px solid var(--border-strong)",
        borderRadius: 4,
        boxShadow: "var(--shadow-float)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Icon name="settings" size={13} style={{ color: "var(--text-secondary)" }} />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: "var(--text-primary)",
          }}
        >
          Tweaks
        </span>
        <button
          onClick={onClose}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            color: "var(--text-tertiary)",
            cursor: "pointer",
            padding: 2,
          }}
        >
          <Icon name="close" size={14} />
        </button>
      </div>
      <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 14 }}>
        <TweakRow
          label="Theme"
          options={[
            ["dark", "Dark"],
            ["light", "Light"],
          ]}
          value={tweaks.theme}
          onChange={(v) => setTweak("theme", v as Tweaks["theme"])}
        />
        <TweakRow
          label="Accent"
          options={[
            ["amber", "Amber"],
            ["green", "Green"],
            ["blue", "Blue"],
            ["red", "Red"],
          ]}
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v as Tweaks["accent"])}
        />
        <TweakRow
          label="Density"
          options={[
            ["compact", "Compact"],
            ["comfortable", "Comfort"],
            ["spacious", "Spacious"],
          ]}
          value={tweaks.density}
          onChange={(v) => setTweak("density", v as Tweaks["density"])}
        />
        <TweakRow
          label="Status"
          options={[
            ["available", "Available"],
            ["advising", "Advising"],
            ["not-looking", "Not looking"],
          ]}
          value={tweaks.availability}
          onChange={(v) => setTweak("availability", v as Tweaks["availability"])}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: ".1em",
              color: "var(--text-tertiary)",
            }}
          >
            HOMELAB SECTION
          </span>
          <label
            style={{
              display: "inline-flex",
              gap: 6,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={tweaks.showHomelab}
              onChange={(e) => setTweak("showHomelab", e.target.checked)}
            />
            <span style={{ fontSize: 12 }}>Show</span>
          </label>
        </div>
      </div>
    </div>
  );
}

type TweakRowProps = {
  label: string;
  options: [string, string][];
  value: string;
  onChange: (v: string) => void;
};

function TweakRow({ label, options, value, onChange }: TweakRowProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: ".1em",
          color: "var(--text-tertiary)",
          marginBottom: 6,
        }}
      >
        {label.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          border: "1px solid var(--border)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {options.map(([v, l]) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{
              flex: 1,
              padding: "6px 8px",
              fontSize: 11,
              cursor: "pointer",
              background: value === v ? "var(--accent)" : "transparent",
              color: value === v ? "var(--accent-fg)" : "var(--text-secondary)",
              border: "none",
              borderRight: "1px solid var(--border)",
              fontFamily: "var(--font-body)",
              fontWeight: value === v ? 500 : 400,
            }}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
