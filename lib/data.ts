export const BIO = {
  name: "Kirill Orlov",
  handle: "diverofdark",
  role: "Vice President @ Solactive",
  location: "Berlin, DE",
  email: "me@kirillorlov.pro",
  linkedin: "linkedin.com/in/diverofdark",
  github: "github.com/diverofdark",
} as const;

export type ExperienceRole = {
  title: string;
  start: string;
  end: string;
  notes: string[];
};

export type ExperienceEntry = {
  company: string;
  current?: boolean;
  start: string;
  end: string;
  roles: ExperienceRole[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Solactive",
    current: true,
    start: "Mar 2024",
    end: "present",
    roles: [
      {
        title: "Vice President",
        start: "Jan 2025",
        end: "present",
        notes: [
          "Financial data processing platforms",
          "Index calculation engine",
          "Team of 8 engineers",
        ],
      },
      {
        title: "Principal Engineer",
        start: "Mar 2024",
        end: "Jan 2025",
        notes: [
          "Java development and architecture",
          "Metrics and observability",
          "CI/CD pipeline management, Dockerization",
        ],
      },
    ],
  },
  {
    company: "Deutsche Bank",
    start: "Sep 2014",
    end: "Feb 2024",
    roles: [
      {
        title: "Engineering Manager",
        start: "Jan 2019",
        end: "Feb 2024",
        notes: [
          "Led cross-functional platform team of 6 engineers",
          "Managed CI/CD and observability for 60+ engineers",
          "Migrated low-latency trading stack from Oracle Java 8 to OpenJDK 11",
          "Maintained global infrastructure (US, EMEA, APAC) for trading desks",
          "Secrets management for audit compliance",
          "Containerized trading stack for Kubernetes (Google Anthos)",
        ],
      },
      {
        title: "Senior Developer",
        start: "Sep 2014",
        end: "Jan 2019",
        notes: [
          "Bonds & swaps electronic trading system (C#/WPF, Java, Angular)",
          "System serving multiple trading desks worldwide",
          "Introduced agile practices to enterprise banking",
          "Authentication across three monolith applications",
        ],
      },
    ],
  },
  {
    company: "FlippingBook",
    start: "Mar 2011",
    end: "Sep 2014",
    roles: [
      {
        title: "Software Developer",
        start: "Mar 2011",
        end: "Sep 2014",
        notes: [
          "C#/WPF application development",
          "Integrated CEFSharp (WebKit) browser for notifications",
          "In-app purchases and notification center",
          "Installer redesign — improved conversion",
          "Vector content editor with zoom/pan",
        ],
      },
    ],
  },
];

export type EducationEntry = {
  org: string;
  detail: string;
  years: string;
};

export const EDUCATION: EducationEntry[] = [
  {
    org: "Moscow State University of Engineering & CS",
    detail: "Specialist — Software of computational hardware & automated systems",
    years: "2006 – 2011",
  },
  {
    org: "Stratoplan Black — Team",
    detail: "Engineering management & leading teams",
    years: "2021",
  },
  {
    org: "RMA",
    detail: "Management of internet-based projects",
    years: "2015 – 2016",
  },
];

export type InterestGroup = {
  kind: string;
  icon: "server" | "box" | "trending";
  items: string[];
};

export const INTERESTS: InterestGroup[] = [
  {
    kind: "INFRA",
    icon: "server",
    items: [
      "Kubernetes orchestration",
      "Self-hosting enterprise tooling",
      "Homelab design",
    ],
  },
  {
    kind: "MAKING",
    icon: "box",
    items: [
      "3D printing — Bambu Lab H2D",
      "CAD design & engineering",
      "CO2 laser cutting",
    ],
  },
  {
    kind: "MARKETS",
    icon: "trending",
    items: ["ETF portfolio", "Index calculation", "Market microstructure"],
  },
];

export type HomelabNode = {
  name: string;
  role: string;
};

export const HOMELAB: HomelabNode[] = [
  { name: "homelab-01", role: "k8s control-plane" },
  { name: "homelab-02", role: "k8s worker" },
  { name: "homelab-03", role: "k8s worker" },
  { name: "homelab-04", role: "k8s worker" },
  { name: "bambulab-h2d", role: "3D printer" },
  { name: "co2-50w", role: "laser cutter" },
];

export const ACCENTS = {
  amber: {
    accent: "oklch(80% 0.16 80)",
    hover: "oklch(85% 0.18 80)",
    muted: "oklch(45% 0.08 80)",
    fg: "oklch(15% 0.01 80)",
  },
  green: {
    accent: "oklch(72% 0.15 150)",
    hover: "oklch(77% 0.17 150)",
    muted: "oklch(45% 0.08 150)",
    fg: "oklch(15% 0.01 150)",
  },
  blue: {
    accent: "oklch(72% 0.14 240)",
    hover: "oklch(77% 0.16 240)",
    muted: "oklch(45% 0.08 240)",
    fg: "oklch(15% 0.01 240)",
  },
  red: {
    accent: "oklch(68% 0.18 25)",
    hover: "oklch(73% 0.20 25)",
    muted: "oklch(40% 0.10 25)",
    fg: "oklch(98% 0 0)",
  },
} as const;

export type AccentName = keyof typeof ACCENTS;

export const DENSITY = {
  compact: { pad: "28px 36px", gap: 28, fs: 0.94 },
  comfortable: { pad: "40px 48px", gap: 40, fs: 1.0 },
  spacious: { pad: "56px 64px", gap: 56, fs: 1.06 },
} as const;

export type DensityName = keyof typeof DENSITY;

export const AVAIL_COPY = {
  available: {
    tag: "AVAILABLE",
    note: "Open to principal / staff / platform-lead roles. Berlin, remote EU, or interesting things in between.",
  },
  advising: {
    tag: "ADVISING",
    note: "Open to advisory & consulting engagements on platform engineering, CI/CD, and team building.",
  },
  "not-looking": {
    tag: "NOT LOOKING",
    note: "Currently happy at Solactive. Always up for a chat about platform engineering and low-latency systems.",
  },
} as const;

export type AvailabilityName = keyof typeof AVAIL_COPY;

export type Theme = "dark" | "light";

export type Tweaks = {
  theme: Theme;
  density: DensityName;
  accent: AccentName;
  availability: AvailabilityName;
  showHomelab: boolean;
};

export const TWEAK_DEFAULTS: Tweaks = {
  theme: "dark",
  density: "comfortable",
  accent: "amber",
  availability: "available",
  showHomelab: true,
};
