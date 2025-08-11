export function EducationSection() {
  return (
    <section className="terminal-border p-6 bg-black/60">
      <h2 className="font-sans text-2xl font-bold mb-6 cyber-blue">{"> EDUCATION.LOG"}</h2>

      <div className="space-y-4">
        <div className="terminal-border p-4 bg-red-900/20">
          <h3 className="font-sans text-lg font-bold soviet-red mb-2">
            MOSCOW STATE UNIVERSITY OF ENGINEERING AND COMPUTER SCIENCE
          </h3>
          <p className="text-green-400">
            Specialist Degree in Software of computational hardware and automated systems
          </p>
          <p className="text-green-600 text-sm">September 2006 - June 2011</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-sans text-lg font-bold cyber-blue">{"> ADDITIONAL_TRAINING.SYS"}</h3>

          <div className="terminal-border p-3 bg-green-900/10">
            <h4 className="font-semibold text-green-400">STRATOPLAN</h4>
            <p className="text-green-300 text-sm">"Stratoplan Black - Team" course</p>
            <p className="text-green-300 text-sm">Engineering Management and Leading Teams</p>
            <p className="text-green-600 text-xs">February 2021 - June 2021</p>
          </div>

          <div className="terminal-border p-3 bg-green-900/10">
            <h4 className="font-semibold text-green-400">RMA</h4>
            <p className="text-green-300 text-sm">Management of internet-based projects</p>
            <p className="text-green-600 text-xs">September 2015 - June 2016</p>
          </div>
        </div>
      </div>
    </section>
  )
}
