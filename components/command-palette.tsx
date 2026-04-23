"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icon, type IconName } from "./ui/icon";
import { kbdS } from "./shared";

export type CommandItem = {
  group?: string;
  label: string;
  icon?: IconName;
  hint?: string;
  run?: () => void;
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
};

export function CommandPalette({ open, onClose, items }: Props) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [open]);

  if (!open) return null;

  const filtered = items.filter(
    (it) =>
      !q ||
      (it.label + " " + (it.hint || "") + " " + (it.group || ""))
        .toLowerCase()
        .includes(q.toLowerCase()),
  );

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((v) => Math.min(v + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((v) => Math.max(v - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const it = filtered[i];
      if (it) {
        it.run?.();
        onClose();
      }
    }
  };

  const groups: Record<string, CommandItem[]> = {};
  filtered.forEach((it) => {
    const g = it.group || "Actions";
    (groups[g] = groups[g] || []).push(it);
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "oklch(0% 0 0 / 0.5)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px, 92vw)",
          background: "var(--bg-overlay)",
          border: "1px solid var(--border-strong)",
          borderRadius: 4,
          boxShadow: "var(--shadow-float)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 14px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Icon name="search" size={15} style={{ color: "var(--text-tertiary)" }} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            onKeyDown={onKey}
            placeholder="Jump to section, copy email, toggle theme…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              padding: 0,
            }}
          />
          <kbd style={kbdS}>ESC</kbd>
        </div>
        <div style={{ maxHeight: 380, overflow: "auto", padding: 6 }}>
          {Object.entries(groups).map(([g, arr]) => (
            <div key={g} style={{ marginBottom: 4 }}>
              <div
                style={{
                  padding: "8px 10px 4px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9.5,
                  letterSpacing: ".14em",
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                }}
              >
                {g}
              </div>
              {arr.map((it) => {
                const idx = filtered.indexOf(it);
                const active = idx === i;
                return (
                  <div
                    key={it.label}
                    onMouseEnter={() => setI(idx)}
                    onClick={() => {
                      it.run?.();
                      onClose();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 2,
                      cursor: "pointer",
                      background: active ? "var(--bg-raised)" : "transparent",
                      borderLeft: `2px solid ${active ? "var(--accent)" : "transparent"}`,
                    }}
                  >
                    {it.icon && (
                      <Icon
                        name={it.icon}
                        size={14}
                        style={{
                          color: active ? "var(--accent)" : "var(--text-secondary)",
                        }}
                      />
                    )}
                    <span
                      style={{
                        flex: 1,
                        fontSize: 13,
                        color: "var(--text-primary)",
                      }}
                    >
                      {it.label}
                    </span>
                    {it.hint && (
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 10.5,
                          color: "var(--text-tertiary)",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {it.hint}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <div
              style={{
                padding: 24,
                textAlign: "center",
                color: "var(--text-tertiary)",
                fontSize: 13,
              }}
            >
              No matches
            </div>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "8px 14px",
            borderTop: "1px solid var(--border)",
            background: "var(--bg-surface)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-tertiary)",
            letterSpacing: ".06em",
          }}
        >
          <span>
            <kbd style={kbdS}>↑↓</kbd> navigate
          </span>
          <span>
            <kbd style={kbdS}>⏎</kbd> select
          </span>
          <span>
            <kbd style={kbdS}>⌘K</kbd> toggle
          </span>
        </div>
      </div>
    </div>
  );
}
