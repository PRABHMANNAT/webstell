import type { ReactNode } from 'react';
import Link from '../SiteLink';
import SiteFooter from '../SiteFooter';
import StudioNav from '../StudioNav';
import StructuredData from '../StructuredData';
import { createArticleSchema } from '../structured-data';
import { insightArticles, type InsightArticle as InsightArticleData } from './insights-data';

type InsightArticleProps = {
  article: InsightArticleData;
  children: ReactNode;
};

export default function InsightArticle({ article, children }: InsightArticleProps) {
  const path = `/insights/${article.slug}` as const;
  const related = insightArticles.filter((item) => item.slug !== article.slug);

  return (
    <>
      <StructuredData data={createArticleSchema({ path, headline: article.title, description: article.description })} />
      <StudioNav />
      <main className="insight-article-page">
        <header className="insight-article-hero studio-width">
          <Link className="insight-back-link" href="/insights">← All insights</Link>
          <div className="insight-article-meta"><span>{article.category}</span><span>{article.readingTime}</span></div>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </header>
        <article className="insight-article-body">{children}</article>
        <aside className="insight-related studio-width" aria-labelledby="related-insights-title">
          <p className="insight-kicker">KEEP READING</p>
          <h2 id="related-insights-title">Related insights</h2>
          <div className="insight-related-grid">
            {related.map((item) => <Link key={item.slug} href={`/insights/${item.slug}`}><span>{item.category} · {item.readingTime}</span><h3>{item.title}</h3><strong>Read article ↗</strong></Link>)}
          </div>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
}
