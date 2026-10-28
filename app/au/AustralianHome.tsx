'use client';
import SiteLink from '../SiteLink';
import { ArrowUpRight } from 'lucide-react';
import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import {
  CapabilityGrid,
  SolutionFinder,
  IndustryExplorer,
  DeliveryProcess,
} from '../SolutionSections';
import AustraliaMap from './AustraliaMap';
import RecentWorkSection from '../RecentWorkSection';
import InternationalProjectsSection from '../InternationalProjectsSection';
import TeamSection from '../TeamSection';
import ContactSection from '../ContactSection';
import FaqAccordion from '../FaqAccordion';
import { australiaFaqs } from '../faq-data';
import StructuredData from '../StructuredData';
import { createPageSchema } from '../structured-data';
import { enquiryHref } from '../service-catalog';
export default function AustralianHome() {
  return (
    <>
      <StructuredData
        data={createPageSchema({
          path: '/au',
          name: 'Webstell Australia | Creative Technology Studio',
          breadcrumbName: 'Australia',
        })}
      />
      <StudioNav />
      <main id="main-content" className="au-page">
        <section className="au-hero">
          <div className="studio-width">
            <div className="au-hero-grid">
              <div className="au-hero-copy">
                <span className="studio-eyebrow">
                  WEBSTELL / FOR AUSTRALIAN BUSINESSES
                </span>
                <h1>
                  Good ideas.
                  <br />
                  <em>Built to go</em>
                  <br />
                  further.
                </h1>
                <p>
                  Distinctive websites. Useful software. AI that earns its
                  place. We connect design, engineering and growth for
                  Australian businesses ready for their next move.
                </p>
                <div className="au-actions">
                  <SiteLink
                    className="agency-button"
                    href={enquiryHref(
                      'software',
                      'Australian business project',
                      { source: 'australia', currency: 'AUD' },
                    )}
                  >
                    Let’s talk about your business <ArrowUpRight size={19} />
                  </SiteLink>
                  <SiteLink className="agency-text-link" href="/pricing">
                    Explore packages ↗
                  </SiteLink>
                </div>
              </div>
              <div className="au-map-panel">
                <span>CONNECTED ACROSS AUSTRALIA</span>
                <AustraliaMap />
                <div className="au-map-labels">
                  <span>Local businesses</span>
                  <span>Growing teams</span>
                  <span>Product founders</span>
                </div>
                <p>
                  A remote studio based in India, collaborating with Australian
                  businesses. The map shows regions we can serve, not office
                  locations.
                </p>
              </div>
            </div>
            <div className="au-proof-strip">
              <div>
                <span>BUILT AROUND YOUR DAY</span>
                <p>Meeting times agreed across your time zone.</p>
              </div>
              <div>
                <span>COMMERCIAL CLARITY</span>
                <p>Proposals in AUD. Setup and ongoing costs separated.</p>
              </div>
              <div>
                <span>DIRECT COLLABORATION</span>
                <p>Clear milestones, review points and handover.</p>
              </div>
            </div>
          </div>
        </section>
        <CapabilityGrid />
        <SolutionFinder />
        <IndustryExplorer australia />
        <DeliveryProcess />
        <RecentWorkSection />
        <InternationalProjectsSection />
        <TeamSection />
        <section className="agency-faq studio-width" id="faq">
          <div className="agency-section-heading">
            <span className="studio-eyebrow">
              WORKING TOGETHER, ACROSS BORDERS
            </span>
            <h2>
              A few things
              <br />
              <em>you might ask.</em>
            </h2>
          </div>
          <FaqAccordion items={australiaFaqs} />
        </section>
        <section className="agency-closing studio-width">
          <h2>
            From the first enquiry
            <br />
            to a better system.
          </h2>
          <p>
            Whether you run a trade business, a clinic, a store or a software
            venture, start with what you want to make better.
          </p>
          <SiteLink
            className="agency-button"
            href={enquiryHref('website', 'Australian business enquiry', {
              source: 'australia',
              currency: 'AUD',
            })}
          >
            Start your project <ArrowUpRight size={19} />
          </SiteLink>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
