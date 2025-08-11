export function ScanLine() {
  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-20 scan-line" />
    </div>
  )
}
