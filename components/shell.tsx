"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Rail } from "./rail";
import { CommandPalette, type CommandItem } from "./command-palette";
import { TweaksPanel } from "./tweaks-panel";
import { Icon } from "./ui/icon";
import { StatusDot } from "./ui/status-dot";
import { useClock } from "@/hooks/use-clock";
import {
  ACCENTS,
  AVAIL_COPY,
  BIO,
  DENSITY,
  TWEAK_DEFAULTS,
  type Tweaks,
} from "@/lib/data";
import type { PostTeaser } from "@/lib/blog";

const STORAGE_KEY = "kotweaks";

export type NavItem = { id: string; label: string };

type ShellContextValue = {
  tweaks: Tweaks;
  copyEmail: () => void;
  /** Numbered home page sections, in page order. Empty on other pages. */
  sections: NavItem[];
  posts: PostTeaser[];
};

const ShellContext = createContext<ShellContextValue | null>(null);

export function useShell(): ShellContextValue {
  const value = useContext(ShellContext);
  if (!value) throw new Error("useShell must be used inside <Shell>");
  return value;
}

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

function jumpTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goTo(href: string) {
  window.location.href = href;
}

type Props = {
  /** Which page the shell wraps: decides the nav bar, shortcuts and palette entries. */
  page: "home" | "blog";
  posts: PostTeaser[];
  children: ReactNode;
};

/** Sidebar, nav bar, command palette, theme and shortcuts shared by every page. */
export function Shell({ page, posts, children }: Props) {
  const [tweaks, setTweak] = useTweaks();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [tweaksPanelOpen, setTweaksPanelOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clock = useClock();
  const hasPosts = posts.length > 0;
  const isHome = page === "home";

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

  const sections = useMemo<NavItem[]>(
    () =>
      isHome
        ? [
            ...(hasPosts ? [{ id: "writing", label: "Writing" }] : []),
            { id: "pipeline", label: "Career" },
            { id: "experience", label: "Experience" },
            ...(tweaks.showHomelab ? [{ id: "homelab", label: "Homelab" }] : []),
            { id: "education", label: "Education" },
            { id: "interests", label: "Off-hours" },
          ]
        : [],
    [isHome, hasPosts, tweaks.showHomelab],
  );
  const anchors = useMemo<NavItem[]>(
    () =>
      isHome
        ? [{ id: "intro", label: "Intro" }, ...sections, { id: "contact", label: "Contact" }]
        : [],
    [isHome, sections],
  );

  // Highlight the nav entry for the section currently under the nav bar.
  const [activeId, setActiveId] = useState("intro");
  useEffect(() => {
    if (anchors.length === 0) return;
    const onScroll = () => {
      let current = anchors[0].id;
      for (const { id } of anchors) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActiveId(atBottom ? anchors[anchors.length - 1].id : current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [anchors]);

  // "g" followed by a letter: jump to a section on the home page, or to a page elsewhere.
  const chords = useMemo<Record<string, () => void>>(
    () =>
      isHome
        ? {
            h: () => jumpTo("intro"),
            e: () => jumpTo("experience"),
            l: () => jumpTo("homelab"),
            c: () => jumpTo("contact"),
            s: () => jumpTo("education"),
            i: () => jumpTo("interests"),
            ...(hasPosts ? { w: () => jumpTo("writing"), b: () => goTo("/blog") } : {}),
          }
        : { h: () => goTo("/"), b: () => goTo("/blog") },
    [isHome, hasPosts],
  );

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
          const run = chords[e2.key.toLowerCase()];
          if (run) {
            e2.preventDefault();
            run();
          }
          window.removeEventListener("keydown", onSecond);
        };
        window.addEventListener("keydown", onSecond);
        setTimeout(() => window.removeEventListener("keydown", onSecond), 800);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tweaks.theme, setTweak, chords]);

  const cmdItems: CommandItem[] = useMemo(() => {
    const navigate: CommandItem[] = isHome
      ? [
          { group: "Navigate", label: "Jump to intro", icon: "arrow", hint: "g h", run: () => jumpTo("intro") },
          ...(hasPosts
            ? ([
                { group: "Navigate", label: "Jump to writing", icon: "arrow", hint: "g w", run: () => jumpTo("writing") },
              ] satisfies CommandItem[])
            : []),
          { group: "Navigate", label: "Jump to experience", icon: "arrow", hint: "g e", run: () => jumpTo("experience") },
          { group: "Navigate", label: "Jump to homelab", icon: "arrow", hint: "g l", run: () => jumpTo("homelab") },
          { group: "Navigate", label: "Jump to education", icon: "arrow", hint: "g s", run: () => jumpTo("education") },
          { group: "Navigate", label: "Jump to interests", icon: "arrow", hint: "g i", run: () => jumpTo("interests") },
          { group: "Navigate", label: "Jump to contact", icon: "arrow", hint: "g c", run: () => jumpTo("contact") },
        ]
      : [{ group: "Navigate", label: "Go to home page", icon: "arrow", hint: "g h", run: () => goTo("/") }];
    const blog: CommandItem[] = hasPosts
      ? [
          { group: "Navigate", label: "All blog posts", icon: "arrow", hint: "g b", run: () => goTo("/blog") },
          ...posts.map(
            (post): CommandItem => ({
              group: "Posts",
              label: post.title,
              icon: "terminal",
              run: () => goTo(`/blog/${post.slug}`),
            }),
          ),
        ]
      : [];
    return [
      ...navigate,
      ...blog,
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
    ];
  }, [isHome, hasPosts, posts, tweaks.theme, copyEmail, setTweak]);

  const d = DENSITY[tweaks.density];
  const clockLabel = clock
    ? clock.toLocaleTimeString("en-GB", { timeZone: "Europe/Berlin" })
    : "--:--:--";

  const context = useMemo(
    () => ({ tweaks, copyEmail, sections, posts }),
    [tweaks, copyEmail, sections, posts],
  );

  return (
    <ShellContext.Provider value={context}>
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
            availabilityTag={AVAIL_COPY[tweaks.availability].tag}
            onCopyEmail={copyEmail}
            onOpenCommand={() => setCmdOpen(true)}
            onOpenTweaks={() => setTweaksPanelOpen(true)}
            page={page}
            showBlog={hasPosts}
          />

          <div className="feed-col">
            <nav
              className="topnav"
              aria-label={isHome ? "Sections" : "Site"}
              style={{ paddingInline: d.pad.split(" ")[1] }}
            >
              <div className="topnav-links">
                {isHome ? (
                  anchors.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={activeId === item.id ? "active" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        jumpTo(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  ))
                ) : (
                  <>
                    <a href="/">Home</a>
                    <a href="/blog" className="active">
                      Blog
                    </a>
                  </>
                )}
              </div>
              {isHome
                ? hasPosts && (
                    <a href="/blog" className="topnav-accent">
                      Blog <Icon name="arrow" size={11} />
                    </a>
                  )
                : (
                    <a href="/blog/feed.xml" className="topnav-accent">
                      RSS
                    </a>
                  )}
            </nav>

            <main
              id="feed"
              className="feed"
              style={{ padding: d.pad, fontSize: `${d.fs}em` }}
            >
              {children}
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
    </ShellContext.Provider>
  );
}
