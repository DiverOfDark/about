export function ContactSection() {
  const contacts = [
    { platform: "EMAIL", value: "me@kirillorlov.pro", color: "cyber-blue", link: "mailto:me@kirillorlov.pro" },
    { platform: "LINKEDIN", value: "linkedin.com/in/diverofdark", color: "soviet-red", link: "https://linkedin.com/in/diverofdark" },
    { platform: "GITHUB", value: "github.com/diverofdark", color: "cyber-blue", link: "https://github.com/diverofdark" },
  ]

  return (
    <section className="terminal-border p-6 bg-black/60">
      <h2 className="font-sans text-2xl font-bold mb-6 cyber-blue">{"> CONTACT.NET"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact, index) => (
          <div key={index} className="terminal-border p-3 bg-black/40 hover:bg-black/60 transition-colors">
            <div className="flex justify-between items-center">
              <span className={`font-sans font-bold ${contact.color}`}>{contact.platform}:</span>
              <span className="text-green-400 text-sm"><a target="_blank" href={contact.link}>{contact.value}</a></span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-green-600 text-sm">{"> ESTABLISHING SECURE CONNECTION..."}</p>
        <p className="text-green-400 text-xs mt-2">{"All communications encrypted with Soviet-grade algorithms"}</p>
      </div>
    </section>
  )
}
