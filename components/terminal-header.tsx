"use client"

import { useState, useEffect } from "react"

export function TerminalHeader() {
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          timeZone: "Europe/Berlin",
          hour12: false,
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <header className="enterprise-border p-6 mb-8 bg-gray-900/90 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="text-amber-400">
          <p>{"> TRADING SYSTEM INITIALIZED..."}</p>
          <p>{"> LOADING MARKET DATA FEED..."}</p>
          <p className="text-green-400">{"> SECURE CONNECTION ACTIVE"}</p>
        </div>
        <div className="text-right text-sm">
          <p className="text-red-400">FINTECH_NODE_001</p>
          <p className="fintech-gold">{currentTime}</p>
          
          <a
            href="/public/cv.pdf"
            target="_blank"
            className="mt-2 px-3 my-2 py-1 bg-amber-400/20 border border-amber-400 text-amber-400 text-xs font-mono hover:bg-amber-400/30 transition-colors"
          >
            [DOWNLOAD_CV.PDF]
          </a>
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-sans text-4xl md:text-6xl font-bold mb-2 glitch">
          <span className="fintech-gold">KIRILL</span> <span className="text-red-400">ORLOV</span>
        </h1>
        <div className="text-amber-400 text-lg">{"> PRINCIPAL_ENGINEER.EXE |> FINTECH | DEVOPS | ARCHITECTURE"}</div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="enterprise-border p-2 bg-amber-900/10">
          <p className="fintech-gold">SYSTEM:</p>
          <p className="text-green-400">OPERATIONAL</p>
        </div>
        <div className="enterprise-border p-2 bg-red-900/10">
          <p className="text-red-400">HQ:</p>
          <p className="text-gray-300">BERLIN, DE</p>
        </div>
        <div className="enterprise-border p-2 bg-amber-900/10">
          <p className="fintech-gold">EXPERIENCE:</p>
          <p className="text-green-400">14+ YEARS</p>
        </div>
      </div>
    </header>
  )
}
