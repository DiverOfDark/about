export function AboutSection() {
  return (
    <section className="terminal-border p-6 bg-black/60">
      <h2 className="font-sans text-2xl font-bold mb-4 cyber-blue">{"> ABOUT.EXE"}</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
            <div className="relative terminal-border bg-black/80 p-2 rounded-lg">
              <img
                src="/photo.jpg"
                alt="Kirill - Software Engineer & Tech Lead"
                className="w-48 h-48 lg:w-56 lg:h-56 object-cover rounded-md grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-md pointer-events-none"></div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="text-xs font-mono text-amber-400 bg-black/80 px-2 py-1 rounded">
                  ID: KIRILL_2024.JPG
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="space-y-4 text-green-300 flex-1">
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
      </div>
    </section>
  )
}
