"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Rail } from "./rail";
import { CommandPalette, type CommandItem } from "./command-palette";
import { TweaksPanel } from "./tweaks-panel";
import { StatusDot } from "./ui/status-dot";
import {
  Intro,
  StatStrip,
  Section,
  CareerPipeline,
  ExperienceList,
  Homelab,
  EducationList,
  WritingList,
  InterestsGrid,
  ContactCTA,
} from "./sections";
import { kbdTiny } from "./shared";
import { Icon } from "./ui/icon";
import { useClock } from "@/hooks/use-clock";
import type { PostTeaser } from "@/lib/blog";
import {
  ACCENTS,
  AVAIL_COPY,
  BIO,
  DENSITY,
  EXPERIENCE,
  TWEAK_DEFAULTS,
  type Tweaks,
} from "@/lib/data";

const STORAGE_KEY = "kotweaks";

function useTweaks(): [Tweaks, <K extends keyof Tweaks>(k: K, v: Tweaks[K]) => void] {
  const [t, setT] = useState<Tweaks>(TWEAK_DEFAULTS);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") {
        setT((v) => ({ ...v, ...saved }));
      }
    } catch {
      // ignore
    }
  }, []);

  const update = useCallback(
    <K extends keyof Tweaks>(k: K, v: Tweaks[K]) => {
      setT((prev) => {
        const next = { ...prev, [k]: v };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [],
  );

  return [t, update];
}

export function Site({ posts }: { posts: PostTeaser[] }) {
  const [tweaks, setTweak] = useTweaks();
  const hasPosts = posts.length > 0;
  const [cmdOpen, setCmdOpen] = useState(false);
  const [tweaksPanelOpen, setTweaksPanelOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clock = useClock();
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Apply theme + accent to :root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tweaks.theme);
    const a = ACCENTS[tweaks.accent] || ACCENTS.amber;
    const root = document.documentElement.style;
    root.setProperty("--accent", a.accent);
    root.setProperty("--accent-hover", a.hover);
    root.setProperty("--accent-muted", a.muted);
    root.setProperty("--accent-fg", a.fg);
  }, [tweaks.theme, tweaks.accent]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  }, []);

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(BIO.email);
    showToast("Email copied");
  }, [showToast]);

  const jumpSafe = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
      if (e.key === "?") {
        setCmdOpen(true);
        return;
      }
      if (e.key.toLowerCase() === "t") {
        setTweak("theme", tweaks.theme === "dark" ? "light" : "dark");
        return;
      }
      if (e.key.toLowerCase() === "g") {
        const onSecond = (e2: KeyboardEvent) => {
          const k = e2.key.toLowerCase();
          const map: Record<string, string> = {
            h: "intro",
            e: "experience",
            l: "homelab",
            c: "contact",
            s: "education",
            i: "interests",
            w: "writing",
          };
          if (k === "b" && hasPosts) {
            e2.preventDefault();
            window.location.href = "/blog";
          } else if (map[k]) {
            e2.preventDefault();
            jumpSafe(map[k]);
          }
          window.removeEventListener("keydown", onSecond);
        };
        window.addEventListener("keydown", onSecond);
        setTimeout(() => window.removeEventListener("keydown", onSecond), 800);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tweaks.theme, setTweak, jumpSafe, hasPosts]);

  // Numbered sections, in page order. The nav bar and the section numbers both come from this list.
  const sections = useMemo(
    () => [
      ...(hasPosts ? [{ id: "writing", label: "Writing" }] : []),
      { id: "pipeline", label: "Career" },
      { id: "experience", label: "Experience" },
      ...(tweaks.showHomelab ? [{ id: "homelab", label: "Homelab" }] : []),
      { id: "education", label: "Education" },
      { id: "interests", label: "Off-hours" },
    ],
    [hasPosts, tweaks.showHomelab],
  );
  const num = (id: string) =>
    String(sections.findIndex((section) => section.id === id) + 1).padStart(2, "0");
  const navItems = useMemo(
    () => [{ id: "intro", label: "Intro" }, ...sections, { id: "contact", label: "Contact" }],
    [sections],
  );

  // Highlight the nav entry for the section currently under the nav bar.
  const [activeId, setActiveId] = useState("intro");
  useEffect(() => {
    const onScroll = () => {
      let current = navItems[0].id;
      for (const { id } of navItems) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActiveId(atBottom ? navItems[navItems.length - 1].id : current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navItems]);

  const d = DENSITY[tweaks.density];
  const avail = AVAIL_COPY[tweaks.availability];

  const cmdItems: CommandItem[] = useMemo(
    () => [
      { group: "Navigate", label: "Jump to intro", icon: "arrow", hint: "g h", run: () => jumpSafe("intro") },
      ...(hasPosts
        ? ([
            { group: "Navigate", label: "Jump to writing", icon: "arrow", hint: "g w", run: () => jumpSafe("writing") },
            { group: "Navigate", label: "Open blog", icon: "external", hint: "g b", run: () => { window.location.href = "/blog"; } },
          ] satisfies CommandItem[])
        : []),
      { group: "Navigate", label: "Jump to experience", icon: "arrow", hint: "g e", run: () => jumpSafe("experience") },
      { group: "Navigate", label: "Jump to homelab", icon: "arrow", hint: "g l", run: () => jumpSafe("homelab") },
      { group: "Navigate", label: "Jump to education", icon: "arrow", hint: "g s", run: () => jumpSafe("education") },
      { group: "Navigate", label: "Jump to interests", icon: "arrow", hint: "g i", run: () => jumpSafe("interests") },
      { group: "Navigate", label: "Jump to contact", icon: "arrow", hint: "g c", run: () => jumpSafe("contact") },
      { group: "Actions", label: "Copy email", icon: "copy", hint: "c", run: copyEmail },
      { group: "Actions", label: "Download CV", icon: "download", run: () => window.open("/cv.pdf", "_blank") },
      { group: "Actions", label: "Open GitHub", icon: "github", run: () => window.open(`https://${BIO.github}`, "_blank") },
      { group: "Actions", label: "Open LinkedIn", icon: "linkedin", run: () => window.open(`https://${BIO.linkedin}`, "_blank") },
      {
        group: "View",
        label: `Toggle theme (currently ${tweaks.theme})`,
        icon: tweaks.theme === "dark" ? "sun" : "moon",
        hint: "t",
        run: () => setTweak("theme", tweaks.theme === "dark" ? "light" : "dark"),
      },
      { group: "View", label: "Open tweaks panel", icon: "settings", run: () => setTweaksPanelOpen(true) },
    ],
    [tweaks.theme, copyEmail, jumpSafe, setTweak, hasPosts],
  );

  const clockLabel = clock
    ? clock.toLocaleTimeString("en-GB", { timeZone: "Europe/Berlin" })
    : "--:--:--";

  return (
    <div
      className="site-root"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="layout">
        <Rail
          tweaks={tweaks}
          setTweak={setTweak}
          clockLabel={clockLabel}
          availabilityTag={avail.tag}
          onCopyEmail={copyEmail}
          onOpenCommand={() => setCmdOpen(true)}
          onOpenTweaks={() => setTweaksPanelOpen(true)}
          showBlog={hasPosts}
        />

        <div className="feed-col">
        <nav
          className="topnav"
          aria-label="Sections"
          style={{ paddingInline: d.pad.split(" ")[1] }}
        >
          <div className="topnav-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeId === item.id ? "active" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  jumpSafe(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
          {hasPosts && (
            <a href="/blog" className="topnav-blog">
              Blog <Icon name="arrow" size={11} />
            </a>
          )}
        </nav>

        <main
          id="feed"
          className="feed"
          style={{ padding: d.pad, fontSize: `${d.fs}em` }}
        >
          <Intro availabilityNote={avail.note} spacing={d.gap} />
          <StatStrip />

          {hasPosts && (
            <Section
              id="writing"
              num={num("writing")}
              label="Writing"
              meta="latest posts"
              spacing={d.gap}
            >
              <WritingList posts={posts} />
            </Section>
          )}

          <Section
            id="pipeline"
            num={num("pipeline")}
            label="Career pipeline"
            meta="3 stops · on schedule"
            spacing={d.gap}
          >
            <CareerPipeline />
          </Section>

          <Section
            id="experience"
            num={num("experience")}
            label="Experience"
            meta={`${EXPERIENCE.length} companies`}
            spacing={d.gap}
          >
            <ExperienceList />
          </Section>

          {tweaks.showHomelab && (
            <Section
              id="homelab"
              num={num("homelab")}
              label="Homelab"
              meta="6 nodes · home-ops"
              spacing={d.gap}
            >
              <Homelab />
            </Section>
          )}

          <Section
            id="education"
            num={num("education")}
            label="Education & training"
            spacing={d.gap}
          >
            <EducationList />
          </Section>

          <Section
            id="interests"
            num={num("interests")}
            label="Off-hours"
            meta="what i do when nothing is paging"
            spacing={d.gap}
          >
            <InterestsGrid />
          </Section>

          <ContactCTA onCopy={copyEmail} />

          <footer
            style={{
              marginTop: d.gap,
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
              {hasPosts && (
                <a
                  href="/blog"
                  style={{ color: "var(--text-tertiary)", textDecoration: "none" }}
                >
                  Blog
                </a>
              )}
              <a
                href="/impressum"
                style={{ color: "var(--text-tertiary)", textDecoration: "none" }}
              >
                Impressum
              </a>
              <a
                href="/datenschutz"
                style={{ color: "var(--text-tertiary)", textDecoration: "none" }}
              >
                Datenschutz
              </a>
              <span style={{ whiteSpace: "nowrap" }}>
                press <kbd style={kbdTiny}>?</kbd> for shortcuts
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <StatusDot status="ready" /> service operational
              </span>
            </span>
          </footer>
        </main>
        </div>
      </div>

      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        items={cmdItems}
      />

      {tweaksPanelOpen && (
        <TweaksPanel
          tweaks={tweaks}
          setTweak={setTweak}
          onClose={() => setTweaksPanelOpen(false)}
        />
      )}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "8px 14px",
            background: "var(--bg-overlay)",
            border: "1px solid var(--border-strong)",
            borderRadius: 4,
            boxShadow: "var(--shadow-float)",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text-primary)",
            letterSpacing: ".04em",
            display: "flex",
            alignItems: "center",
            gap: 8,
            zIndex: 999,
          }}
        >
          <StatusDot status="ready" /> {toast}
        </div>
      )}
    </div>
  );
}
