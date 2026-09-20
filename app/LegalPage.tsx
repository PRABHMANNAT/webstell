import Link from './SiteLink';
import StudioNav from './StudioNav';
import SiteFooter from './SiteFooter';

export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  heroVariant?: 'terms' | 'privacy' | 'accessibility' | 'refunds' | 'cookies';
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  heroVariant,
}: LegalPageProps) {
  return (
    <>
      <StudioNav />
      <main className="legal-page">
        <section className={`legal-hero${heroVariant ? ` legal-hero--${heroVariant}` : ''}`} aria-labelledby="legal-page-title">
          <div className="studio-width">
            <span className="legal-eyebrow">{eyebrow}</span>
            <h1 id="legal-page-title">{title}</h1>
            <p>{intro}</p>
            <span className="legal-updated">Last updated: 16 September 2026</span>
          </div>
        </section>

        <div className="legal-layout studio-width">
          <nav className="legal-contents" aria-label="On this page">
            <span>ON THIS PAGE</span>
            {sections.map((section, index) => (
              <a href={`#legal-section-${index + 1}`} key={section.title}>
                <i>{String(index + 1).padStart(2, '0')}</i>
                {section.title}
              </a>
            ))}
          </nav>

          <article className="legal-article">
            {sections.map((section, index) => (
              <section id={`legal-section-${index + 1}`} key={section.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items && (
                    <ul>
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <aside className="legal-note">
              <span>QUESTIONS?</span>
              <p>If you have a question about this policy, contact us at <a href="mailto:contact@webstell-studio.com">contact@webstell-studio.com</a>.</p>
              <Link href="/contact">Discuss your project <span aria-hidden="true">↗</span></Link>
            </aside>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
