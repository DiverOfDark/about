import type React from "react"
import { JetBrains_Mono, Orbitron } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${orbitron.variable} antialiased`}>
      <head>
        <title>Kirill Orlov.pro</title>
      </head>
      <body className="bg-black text-green-400 font-mono overflow-x-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90 pointer-events-none" />
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-20 transform rotate-45"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
        {children}
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
