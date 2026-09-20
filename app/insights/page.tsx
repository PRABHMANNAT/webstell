import Link from '../SiteLink';
import SiteFooter from '../SiteFooter';
import StudioNav from '../StudioNav';
import StructuredData from '../StructuredData';
import { createPageMetadata } from '../seo-metadata';
import { createPageSchema } from '../structured-data';
import { insightArticles } from './insights-data';

export const metadata = createPageMetadata({
  title: 'Web Design, Software & AI Insights | Webstell',
  description: 'Practical Webstell guides to website costs, project timelines, custom software and better digital product decisions for growing businesses.',
  path: '/insights',
});

export default function InsightsPage() {
  return (
    <>
      <StructuredData data={createPageSchema({ path: '/insights', name: 'Web Design, Software & AI Insights | Webstell', breadcrumbName: 'Insights' })} />
      <StudioNav current="insights" />
      <main className="insights-page">
        <header className="insights-hub-hero studio-width">
          <p className="insight-kicker">WEBSTELL NOTES</p>
          <h1>Insights</h1>
          <p>Practical guides on websites, software, ecommerce, AI automation and digital product decisions for growing businesses.</p>
        </header>
        <section className="insights-index studio-width" aria-labelledby="insights-index-title">
          <div className="insights-index-heading"><span>01</span><h2 id="insights-index-title">Useful answers,<br/>without the sales fog.</h2></div>
          <div className="insights-card-list">
            {insightArticles.map((article, index) => (
              <article className="insights-card" key={article.slug}>
                <div className="insights-card-number">0{index + 1}</div>
                <div className="insights-card-copy">
                  <div className="insight-article-meta"><span>{article.category}</span><span>{article.readingTime}</span></div>
                  <h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3>
                  <p>{article.description}</p>
                  <Link className="insights-read-link" href={`/insights/${article.slug}`}>Read article <span aria-hidden="true">↗</span></Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="insights-hub-cta studio-width">
          <div><p className="insight-kicker">NEED A CLEARER ANSWER?</p><h2>Talk through the decision with us.</h2></div>
          <div><p>Share what you are planning and we’ll help you identify a sensible next step.</p><Link href="/contact">Discuss your project ↗</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
