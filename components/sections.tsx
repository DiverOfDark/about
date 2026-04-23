import type { CSSProperties, ReactNode } from "react";
import { Icon } from "./ui/icon";
import { StatusDot } from "./ui/status-dot";
import { Badge } from "./ui/badge";
import { Sparkline } from "./ui/sparkline";
import { btnP, btnI } from "./shared";
import { BIO, EXPERIENCE, EDUCATION, INTERESTS, HOMELAB } from "@/lib/data";

type SectionProps = {
  id: string;
  num: string;
  label: string;
  meta?: string;
  children: ReactNode;
  spacing: number;
};

export function Section({ id, num, label, meta, children, spacing }: SectionProps) {
  return (
    <section id={id} style={{ marginBottom: spacing }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 14,
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-tertiary)",
            letterSpacing: ".14em",
          }}
        >
          {num}
        </span>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            fontFamily: "var(--font-heading)",
            margin: 0,
          }}
        >
          {label}
        </h3>
        <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
        {meta && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              color: "var(--text-tertiary)",
              letterSpacing: ".06em",
            }}
          >
            {meta}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

type IntroProps = {
  availabilityNote: string;
  spacing: number;
};

export function Intro({ availabilityNote, spacing }: IntroProps) {
  return (
    <section id="intro" style={{ marginBottom: spacing }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: ".14em",
          color: "var(--text-tertiary)",
          marginBottom: 14,
        }}
      >
        # INTRODUCTION
      </div>
      <h2
        style={{
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.12,
          maxWidth: 720,
          textWrap: "balance",
          fontFamily: "var(--font-heading)",
          margin: 0,
        }}
      >
        I build and run platform & trading infrastructure — and lead the teams that
        keep it on the track.
      </h2>
      <p
        style={{
          fontSize: 15.5,
          color: "var(--text-secondary)",
          fontWeight: 300,
          lineHeight: 1.6,
          maxWidth: 680,
          marginTop: 20,
        }}
      >
        Currently VP at Solactive in Berlin, leading the index-calculation engineering
        team. Ten years at Deutsche Bank before that, on low-latency trading stacks
        across US / EMEA / APAC. I work in Java, Kubernetes, YAML, and people — and I
        like dense dashboards, quiet deploys, and tools that don&apos;t shout.
      </p>
      <p
        style={{
          fontSize: 13.5,
          color: "var(--text-tertiary)",
          fontWeight: 300,
          marginTop: 16,
          maxWidth: 680,
          fontStyle: "italic",
        }}
      >
        {availabilityNote}
      </p>
    </section>
  );
}

export function StatStrip() {
  const spark = [
    0.8, 1.3, 1.9, 2.5, 3.2, 4.1, 5.0, 6.0, 7.1, 8.2, 9.3, 10.4, 11.5, 12.5, 13.2,
    14.0,
  ];
  return (
    <section
      className="strip"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
        border: "1px solid var(--border)",
        borderRadius: 4,
        marginBottom: 40,
        background: "var(--bg-surface)",
      }}
    >
      <Metric
        label="Years in industry"
        value="14"
        sub="since Mar 2011"
        spark={<Sparkline points={spark} width={140} height={26} />}
      />
      <Metric label="Current team" value="8" sub="engineers · Solactive" />
      <Metric label="Stack" value="Java · K8s" sub="+Kotlin, YAML, CI/CD" />
      <Metric
        label="Companies"
        value="3"
        sub="FlippingBook → DB → Solactive"
        last
      />
    </section>
  );
}

type MetricProps = {
  label: string;
  value: string;
  sub: string;
  spark?: ReactNode;
  last?: boolean;
};

function Metric({ label, value, sub, spark, last }: MetricProps) {
  return (
    <div
      style={{
        padding: "16px 18px",
        borderRight: last ? "none" : "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minHeight: 104,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: ".12em",
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 22,
          fontWeight: 500,
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--text-secondary)", fontWeight: 300 }}>
        {sub}
      </div>
      {spark && <div style={{ marginTop: "auto" }}>{spark}</div>}
    </div>
  );
}

export function CareerPipeline() {
  const stops = [
    {
      name: "FlippingBook",
      years: "2011–2014",
      label: "Software Developer",
      state: "done" as const,
    },
    {
      name: "Deutsche Bank",
      years: "2014–2024",
      label: "Senior → Eng Manager",
      state: "done" as const,
    },
    {
      name: "Solactive",
      years: "2024–now",
      label: "Principal → Vice President",
      state: "active" as const,
    },
  ];
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 4,
        background: "var(--bg-surface)",
        padding: "28px 32px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: `repeat(${stops.length}, 1fr)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${50 / stops.length}%`,
            right: `${50 / stops.length}%`,
            top: 7,
            height: 2,
            background: "var(--border-strong)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${50 / stops.length}%`,
            top: 7,
            height: 2,
            background: "var(--accent)",
            width: `calc(100% - ${100 / stops.length}%)`,
          }}
        />
        {stops.map((s) => (
          <div
            key={s.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "var(--accent)",
                border: "2px solid var(--accent)",
                boxShadow:
                  s.state === "active"
                    ? "0 0 0 5px oklch(80% 0.16 80 / 0.22)"
                    : "none",
                marginBottom: 14,
              }}
            />
            <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>
              {s.name}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "var(--text-secondary)",
                fontWeight: 300,
                marginTop: 4,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                color: "var(--text-tertiary)",
                marginTop: 6,
                letterSpacing: ".04em",
              }}
            >
              {s.years}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {EXPERIENCE.map((e) => (
        <article
          key={e.company}
          style={{
            border: "1px solid var(--border)",
            borderRadius: 4,
            background: "var(--bg-surface)",
            overflow: "hidden",
          }}
        >
          <header
            style={{
              padding: "14px 20px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <StatusDot status={e.current ? "pending" : "ready"} />
            <h3
              style={{
                fontSize: 16.5,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {e.company}
            </h3>
            <Badge variant="muted">{e.current ? "CURRENT" : "PAST"}</Badge>
            <span
              style={{
                marginLeft: "auto",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-tertiary)",
                letterSpacing: ".04em",
              }}
            >
              {e.start} — {e.end}
            </span>
          </header>
          <div
            style={{
              padding: "18px 20px 22px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {e.roles.map((r) => (
              <div key={r.title} className="role-row">
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 500,
                      color: "var(--accent)",
                      letterSpacing: ".04em",
                      marginBottom: 4,
                    }}
                  >
                    {r.title.toUpperCase().replace(/ /g, "_")}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10.5,
                      color: "var(--text-tertiary)",
                      letterSpacing: ".04em",
                    }}
                  >
                    {r.start} → {r.end}
                  </div>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  {r.notes.map((n) => (
                    <li
                      key={n}
                      style={{
                        fontSize: 13.5,
                        color: "var(--text-secondary)",
                        fontWeight: 300,
                        display: "flex",
                        gap: 10,
                        lineHeight: 1.45,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--accent)",
                          fontFamily: "var(--font-mono)",
                          lineHeight: 1.6,
                          fontSize: 12,
                        }}
                      >
                        ▸
                      </span>
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function Homelab() {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 4,
        background: "var(--bg-base)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          color: "var(--text-tertiary)",
          fontSize: 10.5,
          letterSpacing: ".1em",
        }}
      >
        <Icon name="terminal" size={11} /> $ kubectl get nodes
      </div>
      <div style={{ padding: "10px 14px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: 12,
            fontSize: 9.5,
            letterSpacing: ".1em",
            color: "var(--text-tertiary)",
            paddingBottom: 8,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span>NAME</span>
          <span>ROLE</span>
        </div>
        {HOMELAB.map((n) => (
          <div
            key={n.name}
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr",
              gap: 12,
              padding: "7px 0",
              alignItems: "center",
              fontSize: 12,
              borderBottom: "1px dashed var(--border)",
            }}
          >
            <span style={{ color: "var(--text-primary)" }}>{n.name}</span>
            <span
              style={{
                color: "var(--text-secondary)",
                fontFamily: "var(--font-body)",
                fontSize: 12.5,
                fontWeight: 300,
              }}
            >
              {n.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EducationList() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {EDUCATION.map((e, i) => (
        <div
          key={e.org}
          className="edu-row"
          style={{
            padding: "14px 0",
            display: "grid",
            gridTemplateColumns: "120px 1fr 120px",
            gap: 20,
            borderBottom:
              i === EDUCATION.length - 1 ? "none" : "1px solid var(--border)",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-tertiary)",
              letterSpacing: ".04em",
            }}
          >
            {e.years}
          </span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{e.org}</div>
            <div
              style={{
                fontSize: 12.5,
                color: "var(--text-secondary)",
                fontWeight: 300,
                marginTop: 3,
              }}
            >
              {e.detail}
            </div>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text-tertiary)",
              letterSpacing: ".1em",
              textAlign: "right",
            }}
          >
            COMPLETED
          </span>
        </div>
      ))}
    </div>
  );
}

export function InterestsGrid() {
  return (
    <div
      className="interest-grid"
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}
    >
      {INTERESTS.map((i) => (
        <div
          key={i.kind}
          style={{
            border: "1px solid var(--border)",
            borderRadius: 4,
            background: "var(--bg-surface)",
            padding: "16px 18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <Icon name={i.icon} size={14} style={{ color: "var(--accent)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: ".1em",
                color: "var(--text-primary)",
              }}
            >
              {i.kind}
            </span>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            {i.items.map((it) => (
              <li
                key={it}
                style={{
                  fontSize: 12.5,
                  color: "var(--text-secondary)",
                  fontWeight: 300,
                }}
              >
                {it}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

type ContactProps = {
  onCopy: () => void;
};

export function ContactCTA({ onCopy }: ContactProps) {
  const cta: CSSProperties = {
    border: "1px solid var(--border-strong)",
    borderRadius: 4,
    padding: "28px 32px",
    background: "var(--bg-surface)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
  };
  return (
    <section id="contact" style={cta}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <h3
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            fontFamily: "var(--font-heading)",
            margin: 0,
          }}
        >
          Get in touch.
        </h3>
        <p
          style={{
            fontSize: 13.5,
            color: "var(--text-secondary)",
            fontWeight: 300,
            marginTop: 6,
            maxWidth: 440,
          }}
        >
          Email is fastest. Also on GitHub and LinkedIn — see the rail.
        </p>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <a href={`mailto:${BIO.email}`} style={btnP}>
          <Icon name="mail" size={13} /> {BIO.email}
        </a>
        <button onClick={onCopy} style={btnI} title="Copy email">
          <Icon name="copy" size={13} />
        </button>
      </div>
    </section>
  );
}
