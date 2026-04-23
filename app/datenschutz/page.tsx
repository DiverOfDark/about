import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — kirillorlov.pro",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten auf kirillorlov.pro gemäß Art. 13 DSGVO.",
};

const emailLink = {
  color: "var(--accent)",
} as const;

export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      lang="de"
      otherLegalLink={{ href: "/impressum", label: "Impressum" }}
    >
      <LegalSection heading="1. Verantwortlicher">
        <p style={{ margin: 0 }}>
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der
          Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Kirill Orlov
          <br />
          Meinekestraße 21
          <br />
          10719 Berlin
          <br />
          Deutschland
          <br />
          Telefon:{" "}
          <a href="tel:+4917627540990" style={emailLink}>
            +49 176 27540990
          </a>
          <br />
          E-Mail:{" "}
          <a href="mailto:me@kirillorlov.pro" style={emailLink}>
            me@kirillorlov.pro
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="2. Umfang der Datenverarbeitung">
        <p style={{ margin: 0 }}>
          Diese Website wird auf einem eigenen Server in Deutschland (privater
          Kubernetes-Cluster) betrieben und über Cloudflare Tunnel an das Internet
          angebunden. Beim Aufruf der Seite werden die folgenden technischen Daten
          durch Cloudflare und den Ursprungsserver verarbeitet und in Server-Logs
          gespeichert:
        </p>
        <ul style={{ margin: "12px 0 0 0", paddingLeft: 20 }}>
          <li>IP-Adresse des anfragenden Geräts</li>
          <li>Datum und Uhrzeit der Anfrage</li>
          <li>aufgerufene URL und HTTP-Statuscode</li>
          <li>Referrer-URL (falls übermittelt)</li>
          <li>Browsertyp und Betriebssystem (User-Agent)</li>
        </ul>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Diese Daten werden ausschließlich zur Sicherstellung eines reibungslosen
          Verbindungsaufbaus, zur Abwehr von Angriffen und zur Fehleranalyse
          verwendet. Eine Zusammenführung mit anderen Daten oder eine
          personenbezogene Auswertung findet nicht statt.
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <strong style={{ color: "var(--text-primary)" }}>Rechtsgrundlage:</strong>{" "}
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem stabilen und
          sicheren Betrieb der Website).
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <strong style={{ color: "var(--text-primary)" }}>Speicherdauer:</strong>{" "}
          Logs des Ursprungsservers werden spätestens nach 14 Tagen gelöscht oder
          anonymisiert. Die Speicherung bei Cloudflare richtet sich nach den dort
          geltenden Fristen (siehe Abschnitt 4).
        </p>
      </LegalSection>

      <LegalSection heading="3. Hosting & Content Delivery: Cloudflare">
        <p style={{ margin: 0 }}>
          Zur sicheren Anbindung des Servers an das Internet und zum Schutz vor
          Angriffen nutze ich{" "}
          <a
            href="https://www.cloudflare.com/"
            target="_blank"
            rel="noreferrer"
            style={emailLink}
          >
            Cloudflare Tunnel
          </a>{" "}
          der Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, USA. Alle
          Anfragen an die Website laufen zunächst über die Cloudflare-Infrastruktur
          und werden von dort verschlüsselt an meinen Server weitergeleitet.
          Cloudflare verarbeitet dabei insbesondere IP-Adressen und
          Verbindungsmetadaten.
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <strong style={{ color: "var(--text-primary)" }}>Rechtsgrundlage:</strong>{" "}
          Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
          Funktionsfähigkeit und Sicherheit der Website).
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <strong style={{ color: "var(--text-primary)" }}>Drittlandtransfer:</strong>{" "}
          Cloudflare verarbeitet Daten auch in den USA. Cloudflare ist unter dem
          EU-US Data Privacy Framework zertifiziert. Ergänzend sind
          EU-Standardvertragsklauseln abgeschlossen. Weitere Informationen:{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            target="_blank"
            rel="noreferrer"
            style={emailLink}
          >
            cloudflare.com/privacypolicy
          </a>{" "}
          und{" "}
          <a
            href="https://www.cloudflare.com/cloudflare-customer-dpa/"
            target="_blank"
            rel="noreferrer"
            style={emailLink}
          >
            Cloudflare Customer DPA
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="4. Lokale Speicherung von Einstellungen (localStorage)">
        <p style={{ margin: 0 }}>
          Die Website bietet optionale Anzeigeeinstellungen (Farbschema, Akzentfarbe,
          Informationsdichte, Sichtbarkeit einzelner Abschnitte). Werden diese
          Einstellungen geändert, werden sie unter dem Schlüssel{" "}
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--text-primary)",
            }}
          >
            kotweaks
          </code>{" "}
          im <em>Local Storage</em> Ihres Browsers abgelegt. Diese Daten verlassen
          Ihren Browser nicht und werden nicht an den Server übertragen.
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          <strong style={{ color: "var(--text-primary)" }}>Rechtsgrundlage:</strong>{" "}
          § 25 Abs. 2 Nr. 2 TDDDG (unbedingt erforderlich, um den vom Nutzer
          ausdrücklich gewünschten Telemediendienst zur Verfügung zu stellen) in
          Verbindung mit Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Sie können den Eintrag jederzeit über die Entwicklerwerkzeuge Ihres
          Browsers oder die Browsereinstellungen löschen. Beim nächsten Besuch werden
          die Standardeinstellungen verwendet.
        </p>
      </LegalSection>

      <LegalSection heading="5. Schriftarten">
        <p style={{ margin: 0 }}>
          Schriftarten (Geist, Inter und JetBrains Mono) werden über die
          Next.js-Schriftartenoptimierung zur Build-Zeit heruntergeladen und{" "}
          <strong style={{ color: "var(--text-primary)" }}>
            lokal vom eigenen Server
          </strong>{" "}
          ausgeliefert. Eine Verbindung Ihres Browsers zu Google-Servern oder anderen
          CDNs findet beim Abruf der Schriftarten nicht statt.
        </p>
      </LegalSection>

      <LegalSection heading="6. Cookies & Tracking">
        <p style={{ margin: 0 }}>
          Diese Website setzt{" "}
          <strong style={{ color: "var(--text-primary)" }}>keine Cookies</strong> und
          verwendet keine Analyse-, Tracking- oder Werbedienste. Es werden keine
          personenbezogenen Daten an Dritte weitergegeben, die über das in Abschnitt
          3 beschriebene Hosting hinausgehen.
        </p>
      </LegalSection>

      <LegalSection heading="7. Ihre Rechte">
        <p style={{ margin: 0 }}>
          Sie haben gegenüber dem Verantwortlichen folgende Rechte hinsichtlich der
          Sie betreffenden personenbezogenen Daten:
        </p>
        <ul style={{ margin: "12px 0 0 0", paddingLeft: 20 }}>
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>
            Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
          </li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        </ul>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Zur Ausübung dieser Rechte genügt eine formlose E-Mail an{" "}
          <a href="mailto:me@kirillorlov.pro" style={emailLink}>
            me@kirillorlov.pro
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="8. Beschwerderecht bei der Aufsichtsbehörde">
        <p style={{ margin: 0 }}>
          Sie haben das Recht, sich gemäß Art. 77 DSGVO bei einer Aufsichtsbehörde
          zu beschweren. Für den Verantwortlichen zuständig ist:
        </p>
        <p style={{ marginTop: 12, marginBottom: 0 }}>
          Berliner Beauftragte für Datenschutz und Informationsfreiheit
          <br />
          Friedrichstraße 219, 10969 Berlin
          <br />
          <a
            href="https://www.datenschutz-berlin.de/"
            target="_blank"
            rel="noreferrer"
            style={emailLink}
          >
            www.datenschutz-berlin.de
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="9. Stand dieser Datenschutzerklärung">
        <p style={{ margin: 0 }}>
          Diese Datenschutzerklärung ist gültig ab April 2026. Durch Weiterentwicklung
          der Website oder geänderte rechtliche Vorgaben kann es erforderlich werden,
          die Datenschutzerklärung anzupassen. Die jeweils aktuelle Fassung ist stets
          auf dieser Seite abrufbar.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
