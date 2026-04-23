import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Impressum — kirillorlov.pro",
  description: "Angaben gemäß § 5 TMG für kirillorlov.pro.",
};

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      lang="de"
      otherLegalLink={{ href: "/datenschutz", label: "Datenschutz" }}
    >
      <LegalSection heading="Angaben gemäß § 5 TMG">
        <p style={{ margin: 0 }}>
          Kirill Orlov
          <br />
          Meinekestraße 21
          <br />
          10719 Berlin
          <br />
          Deutschland
        </p>
      </LegalSection>

      <LegalSection heading="Kontakt">
        <p style={{ margin: 0 }}>
          Telefon:{" "}
          <a href="tel:+4917627540990" style={{ color: "var(--accent)" }}>
            +49 176 27540990
          </a>
          <br />
          E-Mail:{" "}
          <a href="mailto:me@kirillorlov.pro" style={{ color: "var(--accent)" }}>
            me@kirillorlov.pro
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="Verantwortlich für den Inhalt">
        <p style={{ margin: 0 }}>
          Kirill Orlov, Meinekestraße 21, 10719 Berlin (Anschrift wie oben).
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Inhalte">
        <p style={{ margin: 0 }}>
          Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine
          Gewähr übernommen werden. Als Diensteanbieter bin ich gemäß § 7 Abs. 1 TMG
          für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Nach §§ 8 bis 10 TMG bin ich als Diensteanbieter jedoch
          nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
          entsprechenden Rechtsverletzungen werde ich diese Inhalte umgehend
          entfernen.
        </p>
      </LegalSection>

      <LegalSection heading="Haftung für Links">
        <p style={{ margin: 0 }}>
          Diese Website enthält ggf. Links zu externen Websites Dritter, auf deren
          Inhalte ich keinen Einfluss habe. Deshalb kann ich für diese fremden
          Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
          auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
          Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
          Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
          einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
          Rechtsverletzungen werde ich derartige Links umgehend entfernen.
        </p>
      </LegalSection>

      <LegalSection heading="Urheberrecht">
        <p style={{ margin: 0 }}>
          Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
          des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
          Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für
          den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte
          auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
          Urheberrechte Dritter beachtet. Sollten Sie trotzdem auf eine
          Urheberrechtsverletzung aufmerksam werden, bitte ich um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werde ich
          derartige Inhalte umgehend entfernen.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
