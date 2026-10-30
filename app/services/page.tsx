'use client';

import SiteLink from '../SiteLink';
import { ArrowUpRight } from 'lucide-react';
import StudioNav from '../StudioNav';
import SiteFooter from '../SiteFooter';
import ServiceShowcase from '../ServiceShowcase';
import SocialWorkGallery from '../SocialWorkGallery';
import './services.css';
import { services, enquiryHref } from '../service-catalog';
import { IndustryExplorer } from '../SolutionSections';
import ViewportVideo from '../ViewportVideo';

export default function ServicesPage() {
  return (
    <>
      <StudioNav current="services" />
      <main className="services-page" id="main-content">
        <h1 className="sr-only">Webstell services and industry packages</h1>
        <section
          className="services-page-hero studio-width"
          aria-labelledby="services-page-title"
        >
          <h2 id="services-page-title" className="sr-only">
            Creative technology in motion
          </h2>
          <ViewportVideo
            className="services-page-hero-video"
            loop
            muted
            playsInline
            preload="none"
            poster="/assets/services/optimized/services-hero.webp"
            aria-hidden="true"
          >
            <source
              src="/assets/services/optimized/services-hero.web.mp4"
              type="video/mp4"
            />
          </ViewportVideo>
        </section>

        <IndustryExplorer />
        <ServiceShowcase />
        <SocialWorkGallery />

        <section
          className="services-explorer"
          aria-labelledby="services-explorer-title"
        >
          <div className="services-explorer-content studio-width">
            <header className="services-explorer-intro">
              <span className="studio-eyebrow">THE WEBSTELL OFFER</span>
              <h2 id="services-explorer-title">
                Six disciplines. One connected approach.
              </h2>
              <p>
                Start with one focused need or combine the right pieces into a
                digital experience that earns attention, works harder and grows
                with your business.
              </p>
            </header>

            <div className="services-page-list" aria-label="WEBSTELL services">
              {services.map((service) => (
                <article
                  className="services-page-card"
                  id={service.id}
                  key={service.id}
                >
                  <small>{service.number}</small>
                  <h3>{service.label}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <p className="service-example">{service.example}</p>
                  <div className="service-card-links">
                    <SiteLink
                      className="services-card-cta"
                      href={enquiryHref(service.project, service.label)}
                    >
                      <span>{service.cta}</span>
                      <ArrowUpRight size={19} aria-hidden="true" />
                    </SiteLink>
                    <SiteLink
                      className="agency-text-link"
                      href={`/pricing?service=${service.project}`}
                    >
                      Explore packages ↗
                    </SiteLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
