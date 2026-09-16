'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';
import { HireDialog } from './StudioNav';

const whyWebstellCards = [
  {
    title: 'Why choose WEBSTELL',
    text: 'Most agencies deliver a polished page. WEBSTELL brings strategy, state-of-the-art design and production-grade engineering together—so your business is easier to trust, harder to ignore and ready to perform long after launch.',
  },
  {
    eyebrow: 'WHAT WE PROVIDE',
    title: 'Websites, digital products and smarter systems.',
  },
  {
    eyebrow: 'HOW WE WORK',
    title: 'Find the focus. Build with intent. Keep moving.',
    text: 'We stay close from the first conversation through launch and beyond—combining clear strategy, direct collaboration and production-ready delivery with maintenance, updates, troubleshooting and support after deployment.',
  },
];

type WhyWebstellSectionProps = {
  id?: string;
  onDiscuss?: () => void;
};

export default function WhyWebstellSection({
  id,
  onDiscuss,
}: WhyWebstellSectionProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);
  const titleId = id ? `${id}-title` : 'why-webstell-title';

  const copyStudioEmail = async () => {
    try {
      await navigator.clipboard.writeText('contact@webstell-studio.com');
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2200);
    } catch {
      setEmailCopied(false);
    }
  };

  const openDiscussDialog = () => {
    if (onDiscuss) {
      onDiscuss();
      return;
    }

    setHireOpen(true);
  };

  return (
    <>
      <section className="insights" id={id} aria-labelledby={titleId}>
        <div className="insights-marquee" aria-label="Why choose WEBSTELL">
          <div className="insights-track">
            <span>
              Why WEBSTELL <i aria-hidden="true">✳</i> Choose WEBSTELL{' '}
              <i aria-hidden="true">✳</i>
            </span>
            <span aria-hidden="true">
              Why WEBSTELL <i>✳</i> Choose WEBSTELL <i>✳</i>
            </span>
          </div>
        </div>
        <div className="insights-inner wrap">
          <div className="insights-lead">
            <p className="insights-kicker">
              Built for businesses that refuse to blend in.
            </p>
            <h2 id={titleId}>About WEBSTELL</h2>
            <p className="insights-summary">
              Founded in 2026, WEBSTELL is a new-generation design and
              technology studio for businesses ready to lead in an AI-shaped
              world. We combine original creative direction, AI-ready
              technology and production-grade engineering—backed by experience
              on international projects—to build digital experiences that stand
              out, earn trust and turn attention into action.
            </p>
            <button type="button" className="all-articles" onClick={openDiscussDialog}>
              <span aria-hidden="true" data-hover-label="Get your website today">↗</span>
              Get your website today
            </button>
            <div className="studio-email-row">
              <a className="studio-email" href="mailto:contact@webstell-studio.com">
                contact@webstell-studio.com
              </a>
              <button
                type="button"
                className="copy-email"
                onClick={copyStudioEmail}
                aria-live="polite"
              >
                <span aria-hidden="true">
                  {emailCopied ? <Check size={15} /> : <Copy size={15} />}
                </span>
                {emailCopied ? 'Copied' : 'Copy email'}
              </button>
            </div>
          </div>
          <div className="insight-grid">
            <div className="insight-image insight-image-red">
              <Image
                src="/assets/insights-red.avif"
                alt="WEBSTELL design direction"
                width={900}
                height={1000}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
            <article className="insight-card featured">
              <h3>{whyWebstellCards[0].title}</h3>
              <p>{whyWebstellCards[0].text}</p>
              <footer>
                <a className="insight-about-link" href="/about">
                  <span>Read more about us</span>
                  <i aria-hidden="true">↗</i>
                </a>
              </footer>
            </article>
            <article className="insight-card">
              <span>{whyWebstellCards[1].eyebrow}</span>
              <h3>{whyWebstellCards[1].title}</h3>
              <ul className="insight-services">
                <li>Websites</li>
                <li>Online stores</li>
                <li>Custom software</li>
                <li>Mobile apps</li>
                <li>Chatbots &amp; automation</li>
                <li>Branding &amp; UI/UX</li>
              </ul>
            </article>
            <div className="insight-image insight-image-blue">
              <Image
                src="/assets/insights-blue.avif"
                alt="WEBSTELL digital product direction"
                width={900}
                height={1000}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </div>
            <article className="insight-card wide">
              <span>{whyWebstellCards[2].eyebrow}</span>
              <h3>{whyWebstellCards[2].title}</h3>
              <p>{whyWebstellCards[2].text}</p>
            </article>
          </div>
        </div>
      </section>
      {!onDiscuss && <HireDialog open={hireOpen} onOpenChange={setHireOpen} />}
    </>
  );
}
