"use client";

import { Shell, useShell } from "./shell";
import { SiteFooter } from "./site-footer";
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
import { AVAIL_COPY, DENSITY, EXPERIENCE } from "@/lib/data";
import type { PostTeaser } from "@/lib/blog";

export function Site({ posts }: { posts: PostTeaser[] }) {
  return (
    <Shell page="home" posts={posts}>
      <HomeFeed />
    </Shell>
  );
}

function HomeFeed() {
  const { tweaks, copyEmail, sections, posts } = useShell();
  const d = DENSITY[tweaks.density];
  const num = (id: string) =>
    String(sections.findIndex((section) => section.id === id) + 1).padStart(2, "0");

  return (
    <>
      <Intro availabilityNote={AVAIL_COPY[tweaks.availability].note} spacing={d.gap} />
      <StatStrip />

      {posts.length > 0 && (
        <Section
          id="writing"
          num={num("writing")}
          label="Writing"
          meta="latest posts"
          spacing={d.gap}
        >
          <WritingList posts={posts.slice(0, 3)} allPostsLink />
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

      <Section id="education" num={num("education")} label="Education & training" spacing={d.gap}>
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

      <SiteFooter />
    </>
  );
}
