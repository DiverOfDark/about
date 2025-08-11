export function ExperienceSection() {
  const experiences = [
    {
      company: "SOLACTIVE",
      role: "Principal Engineer -> Team Lead",
      period: "March 2024 - Present",
      categories: {
        "TEAM_LEAD": {
          period: "Jan 2025 - Present",
          items: ["Financial data processing platforms", "Index calculation engine", "Team of 8 engineers"]
        },
        PRINCIPAL_ENGINEER: {
          period: "March 2024 - Jan 2025",
          items: ["Java development and architecture", "Metrics and observability", "CI/CD pipeline management", "Dockerization"]
        },
      },
      color: "cyber-blue",
    },
    {
      company: "DEUTSCHE_BANK",
      role: "Senior Developer -> Engineering Manager / Technical Lead",
      period: "September 2014 - February 2024",
      categories: {
        ENGINEERING_MANAGER: {
          period: "Jan 2019 - Feb 2024",
          items: [
            "Led cross-functional platform team of 6 engineers",
            "Managed CI/CD and observability for 60+ software engineers",
            "Migrated low-latency trading stack from Oracle Java 8 to OpenJDK 11",
            "Maintained global infrastructure (US, EMEA, APAC) supporting trading desks",
            "Implemented secrets management for audit compliance",
            "Containerized trading stack for Kubernetes (Google Anthos)",
          ],
        },
        SENIOR_DEVELOPER: {
          period: "Sep 2014 - Jan 2019",
          items: [
            "Developed bonds and swaps electronic trading system (C#/WPF, Java, JavaScript/Angular)",
            "Delivered system serving multiple trading desks worldwide",
            "Introduced agile practices to enterprise banking environment",
            "Built authentication system across three monolith applications",
            "Extended trading application with internal framework integration",
          ],
        },
      },
      color: "soviet-red",
    },
    {
      company: "FLIPPINGBOOK",
      role: "Software Developer",
      period: "March 2011 - September 2014",
      categories: {
        SENIOR_DEVELOPER: [
              "C#/WPF application development",
              "Integrated WebKit-based browser (CEFSharp) for notification system",
              "Implemented in-app purchases and notification center",
              "Designed new installer for improved conversion rates",
              "Created vector-based content editor with zoom/pan capabilities",
            ]
      },
      color: "cyber-blue",
    },
  ]

  return (
    <section className="terminal-border p-6 bg-black/60">
      <h2 className="font-sans text-2xl font-bold mb-6 cyber-blue">{"> EXPERIENCE.LOG"}</h2>

      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="terminal-border p-4 bg-black/40">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 className={`font-sans text-lg font-bold ${exp.color}`}>{exp.company}</h3>
                <p className="text-green-400 font-semibold">{exp.role}</p>
              </div>
              <div className="text-green-600 text-sm mt-2 md:mt-0">{exp.period}</div>
            </div>

            <div className="space-y-3">
              {Object.entries(exp.categories).map(([category, content]) => (
                <div key={category} className="space-y-2">
                  {typeof content === "object" && content.period ? (
                    // Deutsche Bank role structure
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-amber-400 text-xs font-mono">[{category}]</span>
                        <span className="text-green-600 text-xs">({content.period})</span>
                      </div>
                      <ul className="space-y-1 ml-4">
                        {content.items.map((item, idx) => (
                          <li key={idx} className="text-green-300 text-sm flex items-start">
                            <span className="text-amber-400 mr-2 mt-1">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    // Regular category structure
                    <div>
                      <div className="text-amber-400 text-xs font-mono mb-1">[{category}]</div>
                      <ul className="space-y-1 ml-4">
                        {content.map((item, idx) => (
                          <li key={idx} className="text-green-300 text-sm flex items-start">
                            <span className="text-amber-400 mr-2 mt-1">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
