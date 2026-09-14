'use client';

import { useState } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  Send,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { whatsappUrl } from './contact-utils';

export function HireDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="hire-dialog" showCloseButton={false}>
        <DialogClose
          className="hire-close"
          aria-label="Close conversation options"
        >
          <X size={20} />
        </DialogClose>
        <span className="studio-eyebrow">GOOD THINGS START WITH A HELLO</span>
        <DialogTitle className="hire-title">
          Your next big thing.
          <br />
          <span>Let’s talk about it.</span>
        </DialogTitle>
        <DialogDescription className="hire-description">
          A rough idea, a detailed brief, or just a question. We’re all ears.
        </DialogDescription>
        <div className="hire-options">
          <a
            className="hire-option whatsapp-option"
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
          >
            <span className="option-icon">
              <MessageCircle />
            </span>
            <div>
              <strong>Connect on WhatsApp</strong>
              <p>Say hello. Tell us what you have in mind.</p>
            </div>
            <ArrowUpRight />
          </a>
          <a className="hire-option" href="/contact">
            <span className="option-icon">
              <Send />
            </span>
            <div>
              <strong>Send us a message</strong>
              <p>Give your idea a little more room.</p>
            </div>
            <ArrowUpRight />
          </a>
          <a className="hire-option" href="/schedule">
            <span className="option-icon">
              <CalendarDays />
            </span>
            <div>
              <strong>Book a call</strong>
              <p>Pick a time for a 30-minute conversation.</p>
            </div>
            <ArrowUpRight />
          </a>
        </div>
        <p className="hire-footnote">
          Real people. Useful advice. No pressure.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default function StudioNav({ current = '' }: { current?: string }) {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const links = [
    ['Works', '/projects'],
    ['Services', '/#services'],
    ['Pricing', '/pricing'],
    ['Insights', '/#insights'],
    ['Team', '/#team'],
    ['Contact', '/contact'],
  ];
  return (
    <>
      <header className="site-header">
        <div className="header wrap">
          <div className="nav-capsule">
            <a className="nav-mark" href="/" aria-label="WEBSTELL home">
              <img src="/assets/brand/webstell-retro-mac.png" alt="" />
              <span>WEBSTELL</span>
            </a>
            <nav
              id="navigation"
              aria-label="Main navigation"
              className={menu ? 'open' : ''}
            >
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  aria-current={
                    current === label.toLowerCase() ? 'page' : undefined
                  }
                  onClick={() => setMenu(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <button
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-controls="navigation"
          >
            {menu ? 'Close' : 'Menu'}{' '}
            <span aria-hidden="true">{menu ? '−' : '☰'}</span>
          </button>
          <button
            className="hire-pill"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
          >
            <span aria-hidden="true">
              <ArrowUpRight size={22} />
            </span>{' '}
            Hire Team
          </button>
        </div>
      </header>
      <HireDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function StudioFooter() {
  return (
    <footer className="studio-footer studio-footer-rich">
      <img
        className="studio-footer-image"
        src="/assets/footer/webstell-footer.avif"
        alt=""
        loading="lazy"
      />
      <div className="studio-footer-shade" aria-hidden="true" />
      <div className="studio-footer-panel studio-width">
        <div className="studio-footer-intro">
          <a href="/" className="studio-footer-brand">
            WEBSTELL
          </a>
          <p>Ideas into things people use.</p>
          <a className="studio-footer-call" href="/schedule">
            <span>Have a project in mind?</span>
            Book a call <ArrowUpRight size={18} />
          </a>
        </div>
        <nav className="studio-footer-links" aria-label="Footer navigation">
          <div>
            <span>EXPLORE</span>
            <a href="/">Home</a>
            <a href="/#projects">Selected work</a>
            <a href="/#services">Services</a>
          </div>
          <div>
            <span>START HERE</span>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Send a brief</a>
            <a href="/schedule">Book a call</a>
          </div>
        </nav>
        <div className="studio-footer-meta">
          <span>Based in India. Building everywhere.</span>
          <span>© {new Date().getFullYear()} WEBSTELL</span>
        </div>
      </div>
      <div className="studio-footer-wordmark" aria-hidden="true">
        WEBSTELL
      </div>
    </footer>
  );
}
