'use client';

import { useState, type SyntheticEvent } from 'react';

export default function SiteFooter() {
  const [subscribeState, setSubscribeState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subscribeMessage, setSubscribeMessage] = useState('Get website maintenance, development updates and customer insights—straight to your inbox.');

  const submitSubscription = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (subscribeState === 'loading' || subscribeState === 'success') return;

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const emailEntry = form.get('email');
    const websiteEntry = form.get('website');
    const email = typeof emailEntry === 'string' ? emailEntry.trim() : '';
    const website = typeof websiteEntry === 'string' ? websiteEntry : '';

    setSubscribeState('loading');
    setSubscribeMessage('Sending your subscription…');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      const result = await response.json() as { ok?: boolean; message?: string };

      if (!response.ok || !result.ok) {
        setSubscribeState('error');
        setSubscribeMessage(result.message || 'Subscription could not be sent. Please try again.');
        return;
      }

      setSubscribeState('success');
      setSubscribeMessage('Thanks — your subscription has been sent to WEBSTELL.');
      formElement.reset();
    } catch {
      setSubscribeState('error');
      setSubscribeMessage('Subscription could not be sent. Please try again.');
    }
  };

  return (
    <footer className="site-footer">
      <img className="site-footer-bg" src="/assets/footer/webstell-footer.avif" alt="Luminous cube in a landscaped garden" loading="lazy" />
      <div className="site-footer-shade" aria-hidden="true" />
      <div className="footer-panel wrap">
        <div className="footer-brand">
          <a className="footer-logo" href="/">WEBSTELL</a>
          <p>We create distinctive websites, brands and digital products for ambitious businesses.</p>
          <form className={`subscribe-form is-${subscribeState}`} onSubmit={submitSubscription}>
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input className="studio-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <input id="footer-email" name="email" type="email" required placeholder="you@company.com" aria-describedby="subscribe-status" disabled={subscribeState === 'loading' || subscribeState === 'success'} />
            <button type="submit" aria-busy={subscribeState === 'loading'} disabled={subscribeState === 'loading' || subscribeState === 'success'}>
              <span aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" /></svg></span>
              {subscribeState === 'loading' ? 'Sending…' : subscribeState === 'success' ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
          <p className="subscribe-status" id="subscribe-status" aria-live="polite">{subscribeMessage}</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <div className="footer-link-group"><span className="footer-nav-label">Explore</span><a href="/">Home</a><a href="/services">Services</a><a href="/projects">Work</a><a href="/pricing">Pricing</a></div>
          <div className="footer-link-group"><span className="footer-nav-label">Company</span><a href="/#insights">Why WEBSTELL</a><a href="/#team">Our team</a><a href="/#faq">FAQs</a><a href="/contact">Contact</a></div>
          <div className="footer-link-group footer-policies"><span className="footer-nav-label">Policies</span><div className="footer-policy-links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms &amp; Conditions</a><a href="/cookies">Cookies</a><a href="/refunds">Refunds</a><a href="/accessibility">Accessibility</a></div></div>
        </nav>
      </div>
      <div className="footer-wordmark" aria-hidden="true">WEBSTELL</div>
    </footer>
  );
}
