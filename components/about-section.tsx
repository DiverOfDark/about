export function AboutSection() {
  return (
    <section className="terminal-border p-6 bg-black/60">
      <h2 className="font-sans text-2xl font-bold mb-4 cyber-blue">{"> ABOUT.EXE"}</h2>

      <div className="space-y-4 text-green-300">
        <p className="text-lg">
          <span className="soviet-red">Privet</span> / <span className="cyber-blue">Hallo!</span>
          {
            " My name is Kirill, and I am a hands-on tech lead, software engineer, engineering manager, and devops enthusiast, living in the vibrant city of Berlin."
          }
        </p>

        <div className="terminal-border p-4 bg-green-900/10 mt-4">
          <h3 className="font-sans font-bold mb-2 cyber-blue">CORE_CAPABILITIES.SYS</h3>
          <ul className="space-y-1 text-sm">
            <li>{"> Extensive software engineering experience (14+ years)"}</li>
            <li>{"> Complex project management across diverse tech stacks"}</li>
            <li>{"> Agile methodologies & Kanban expertise"}</li>
            <li>{"> Team leadership & mentoring protocols"}</li>
            <li>{"> Advanced troubleshooting algorithms"}</li>
            <li>{"> CI/CD pipeline architecture"}</li>
            <li>{"> Code writing mostly in Java"}</li>
            <li>{"> Yaml development on Kubernetes"}</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
