import Link from '../../SiteLink';
import { createPageMetadata } from '../../seo-metadata';
import InsightArticle from '../InsightArticle';
import { insightArticles } from '../insights-data';

const article = insightArticles[0];

export const metadata = createPageMetadata({
  title: 'How Much Does a Website Cost in India? | Webstell',
  description: 'Understand realistic website costs in India, what changes the price, and how to compare business websites, stores and custom software.',
  path: '/insights/how-much-does-a-website-cost-in-india',
});

export default function WebsiteCostIndiaPage() {
  return <InsightArticle article={article}>
    <p className="article-answer"><strong>Quick answer:</strong> website costs in India vary with scope, design, content and integrations. Webstell’s current starting estimates are ₹20,000 for a five-page business website or portfolio, ₹50,900 for an online store, and ₹65,000 for focused custom software. These are starting points, not universal market prices.</p>

    <h2>What actually affects website cost?</h2>
    <p>A useful quote is based on the work required, not simply the label “website.” A clear five-page service site is a different project from a multilingual store with customer accounts, shipping updates and an editing dashboard.</p>
    <p>The largest cost drivers are the number of pages or screens, design complexity, content preparation, ecommerce features, third-party integrations and how much custom behaviour the project needs. Our <Link href="/pricing">pricing calculator</Link> makes those choices visible rather than hiding them inside a single number.</p>

    <h2>Typical Webstell starting points</h2>
    <h3>Brochure or business website</h3>
    <p>A focused business website is designed to explain what you do, build trust and generate enquiries. Webstell’s current starting estimate is ₹20,000 for five pages. Extra pages are estimated at ₹1,500 each before other features are added.</p>
    <p>This can suit a consultant, local service business, restaurant or growing company that needs a professional home online without a complicated application behind it.</p>

    <h3>Portfolio website</h3>
    <p>A portfolio also starts at ₹20,000 for five pages in the current calculator. The work often shifts toward project presentation, image treatment and case-study layouts. A content-management system, detailed work stories or copy support can increase the scope.</p>

    <h3>Ecommerce website</h3>
    <p>Webstell’s online-store estimate starts at ₹50,900 for six pages. Product structure, checkout, payments, shipping, discounts and customer accounts can all affect the total. Product photography, descriptions and catalogue preparation are separate content considerations even when the store technology is straightforward.</p>

    <h3>Custom software or a web application</h3>
    <p>A focused dashboard, portal or web application starts at ₹65,000 for four core screens in the current calculator. Custom software is priced around workflows, user roles, data and integrations—not page count alone. If the main need is operational rather than promotional, read our guide to <Link href="/insights/website-vs-custom-software">websites versus custom software</Link>.</p>

    <h2>Design and content change the workload</h2>
    <p>A template-led site with prepared copy and imagery requires less discovery than a distinctive brand-led website built from a blank page. Custom animation, illustration and unusual interactions also require design, development and testing time.</p>
    <p>Content is often underestimated. Someone still needs to define the message, write useful copy, select images and supply accurate product or service details. Webstell’s calculator currently estimates copy support at ₹3,500 where available, but the right scope depends on how much material already exists.</p>

    <h2>Integrations, maintenance, hosting and domains</h2>
    <p>Payments, bookings, customer accounts, CRM connections and automation introduce setup, testing and sometimes recurring third-party fees. Ask whether those external charges are included in the proposal or paid directly to the provider.</p>
    <p>Hosting and maintenance are related but different. Hosting keeps the site available; maintenance covers updates, monitoring, fixes and agreed ongoing improvements. A standard non-premium domain may be included for the first year when it is part of the agreed Webstell package, while renewals and paid services should be confirmed in writing.</p>

    <h2>Questions to ask before choosing an agency</h2>
    <ul>
      <li>What pages, features and revision rounds are included?</li>
      <li>Who supplies and uploads the copy, images and product information?</li>
      <li>Are hosting, domain renewals and third-party subscriptions separate?</li>
      <li>Will the site work well on mobile and be tested before launch?</li>
      <li>Who owns the completed work and account access after final payment?</li>
      <li>How are additions outside the agreed scope priced?</li>
    </ul>

    <h2>When is a low-cost website enough?</h2>
    <p>A simple, lower-cost build can be the right decision when the business has a clear offer, limited content and no unusual workflows. Good structure, readable copy, mobile usability and a reliable contact journey matter more than adding features nobody needs.</p>
    <p>Custom work makes more sense when design is central to positioning, the site must connect several services, customers need accounts or checkout, or the business has a workflow that off-the-shelf tools cannot handle cleanly. Review relevant <Link href="/projects">project directions</Link> and choose complexity only when it solves a real problem.</p>

    <div className="article-callout"><h2>Turn the estimate into a clear scope</h2><p>Use the calculator for a transparent starting point, then share the business goal so the scope can be checked properly.</p><Link href="/pricing">Estimate your project ↗</Link></div>
  </InsightArticle>;
}
