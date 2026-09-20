import Link from '../../SiteLink';
import { createPageMetadata } from '../../seo-metadata';
import InsightArticle from '../InsightArticle';
import { insightArticles } from '../insights-data';

const article = insightArticles[1];

export const metadata = createPageMetadata({
  title: 'How Long Does It Take to Build a Business Website? | Webstell',
  description: 'Learn realistic website timelines, what causes delays, and how content, feedback, integrations, testing and launch affect delivery.',
  path: '/insights/how-long-does-it-take-to-build-a-business-website',
});

export default function WebsiteTimelinePage() {
  return <InsightArticle article={article}>
    <p className="article-answer"><strong>Quick answer:</strong> a focused business website often takes 2–3 weeks once the scope and required material are ready. Webstell currently estimates 3–4 weeks for a starter online store and 4–6 weeks for focused custom software. Added pages, features and delayed feedback extend those ranges.</p>

    <h2>Different projects need different schedules</h2>
    <p>A timeline should describe a defined scope. “Build a website” is too broad: a five-page service site, an image-heavy portfolio and an ecommerce catalogue involve different content, decisions and testing.</p>

    <h3>Small business website</h3>
    <p>Webstell’s current estimate for a five-page business site is 2–3 weeks. That usually covers a focused structure, responsive layouts, the agreed contact journey and testing. Additional pages or features add work and may extend the schedule.</p>

    <h3>Portfolio website</h3>
    <p>A five-page portfolio also starts around 2–3 weeks. The schedule depends heavily on whether project images, descriptions and case studies are ready. Selecting and preparing a large body of work can take longer than building the underlying pages.</p>

    <h3>Ecommerce website</h3>
    <p>A starter online store is currently estimated at 3–4 weeks. Product information, payments, shipping rules, discounts and order emails all need attention. A large or inconsistent catalogue can become the main source of delay.</p>

    <h3>Custom software</h3>
    <p>A focused first version of a dashboard, portal or web application starts around 4–6 weeks in Webstell’s calculator. User roles, integrations, reports and extra screens increase the delivery range. Complex software should be planned around useful releases instead of one distant all-or-nothing launch.</p>

    <h2>What usually causes delays?</h2>
    <p>The most common delays happen between production steps: missing copy, undecided services, late photographs, access to third-party accounts or feedback arriving from several people at different times.</p>
    <ul>
      <li><strong>Content:</strong> final text and images arrive after layouts have been approved.</li>
      <li><strong>Feedback:</strong> decisions take longer because ownership is unclear.</li>
      <li><strong>Scope:</strong> new pages or features are introduced during development.</li>
      <li><strong>Integrations:</strong> payment, booking or CRM accounts are not ready for testing.</li>
      <li><strong>Approvals:</strong> product, legal or brand reviews are added late in the process.</li>
    </ul>

    <h2>Testing and launch are part of the work</h2>
    <p>A page looking finished is not the same as a site being ready. The team still needs to review important journeys on different screen sizes, test links and forms, check content, configure production settings and confirm account access.</p>
    <p>At launch, Webstell tests the agreed journeys, deploys the site, hands over access and explains the parts the client will manage. The included support period and any maintenance arrangement should be stated in the proposal. Browse our <Link href="/services">development services</Link> for the kinds of work that may form part of a scope.</p>

    <h2>How to help a project move faster</h2>
    <ol>
      <li>Agree on one decision-maker and one consolidated feedback process.</li>
      <li>Prepare the offer, page list, copy, images and account access before production begins.</li>
      <li>Separate must-have launch features from ideas that can follow later.</li>
      <li>Review work on the agreed dates and explain the reason behind requested changes.</li>
      <li>Use real content early; placeholder text hides layout and messaging problems.</li>
    </ol>

    <h2>What should not be rushed?</h2>
    <p>Do not compress discovery until nobody agrees on the audience or goal. Do not skip mobile testing, form checks, payment testing or content review to reach an arbitrary date. Fixing a confused structure after launch usually costs more than deciding it properly at the start.</p>
    <p>A useful schedule protects the decisions that matter while keeping optional complexity under control. If you are still deciding whether the project is primarily a site or a business tool, compare a <Link href="/insights/website-vs-custom-software">website with custom software</Link> before setting the deadline.</p>

    <div className="article-callout"><h2>Plan around a real scope</h2><p>Tell us what needs to be ready, who will provide the content and whether a launch date is fixed. We can then discuss a practical sequence.</p><Link href="/schedule">Request a project call ↗</Link></div>
  </InsightArticle>;
}
