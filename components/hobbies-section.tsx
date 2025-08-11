"use client"

export function HobbiesSection() {
  return (
    <section className="enterprise-border bg-gray-900/80 backdrop-blur-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <h2 className="text-xl font-mono text-amber-400 uppercase tracking-wider">{"> PERSONAL_INTERESTS.EXE"}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="border-l-2 border-amber-400/30 pl-4">
            <h3 className="text-amber-400 font-mono text-sm mb-2">[INFRASTRUCTURE_TECH]</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span>Kubernetes orchestration & cluster management</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span>Self-hosting enterprise solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span>Homelab infrastructure design</span>
              </div>
            </div>
          </div>

          <div className="border-l-2 border-amber-400/30 pl-4">
            <h3 className="text-amber-400 font-mono text-sm mb-2">[MANUFACTURING_TECH]</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">●</span>
                <span>3D printing & rapid prototyping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">●</span>
                <span>CAD design & engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-400">●</span>
                <span>Laser cutting and engraving</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-l-2 border-amber-400/30 pl-4">
            <h3 className="text-amber-400 font-mono text-sm mb-2">[FINANCIAL_MARKETS]</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">●</span>
                <span>ETF portfolio</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-3 rounded border border-amber-400/20">
            <div className="text-xs font-mono text-amber-400 mb-1">SYSTEM_STATUS:</div>
            <div className="text-xs text-gray-400">
              <div>HOMELAB_UPTIME: 99.???%</div>
              <div>K8S_NODES: 4 ACTIVE</div>
              <div>3D PRINTER: Voron 2.4r2</div>
              <div>LASER_CUTTER: 50W CO2</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
