import { TerminalHeader } from "@/components/terminal-header"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { EducationSection } from "@/components/education-section"
import { HobbiesSection } from "@/components/hobbies-section"
import { ContactSection } from "@/components/contact-section"
import { ScanLine } from "@/components/scan-line"

export default function Home() {
  return (
    <main className="relative min-h-screen dark-hacker-bg">
      <ScanLine />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <TerminalHeader />

        <div className="space-y-12">
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <HobbiesSection />
          <ContactSection />
        </div>

        <footer className="mt-16 text-center text-amber-400 text-sm">
          <div className="enterprise-border p-4 bg-gray-900/80 backdrop-blur-sm">
            <p>{"> TRADING SYSTEM: ACTIVE"}</p>
            <p>{"> SECURITY LEVEL: MAXIMUM"}</p>
            <p className="text-red-400">{"> ENTERPRISE GRADE INFRASTRUCTURE"}</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
