'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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

const navigationLinks = [
  ['Work', '/projects'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Pricing', '/pricing'],
  ['Contact', '/contact'],
] as const;

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
          <Link className="hire-option" href="/contact">
            <span className="option-icon">
              <Send />
            </span>
            <div>
              <strong>Send us a message</strong>
              <p>Give your idea a little more room.</p>
            </div>
            <ArrowUpRight />
          </Link>
          <Link className="hire-option" href="/schedule">
            <span className="option-icon">
              <CalendarDays />
            </span>
            <div>
              <strong>Request a call</strong>
              <p>Pick a time for a 30-minute conversation.</p>
            </div>
            <ArrowUpRight />
          </Link>
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const visibleNavigationLinks = pathname === '/'
    ? navigationLinks
    : ([['Home', '/'], ...navigationLinks] as const);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    const initialFrame = window.requestAnimationFrame(updateHeader);
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', updateHeader);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const focusFrame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenu(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menu]);

  const toggleMenu = () => setMenu((isOpen) => !isOpen);
  const closeMenu = () => setMenu(false);
  const navigateWithDocument = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.location.assign(event.currentTarget.href);
  };

  return (
    <>
      <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
        <div className="header wrap">
          <div className="nav-capsule">
            <Link className="nav-mark" href="/" aria-label="WEBSTELL home" prefetch={false} onClick={navigateWithDocument}>
              <Image
                src="/assets/brand/webstell-retro-mac.png"
                alt=""
                width={29}
                height={29}
                sizes="29px"
                priority
                unoptimized
              />
              <span>WEBSTELL</span>
            </Link>
            <nav
              id="navigation"
              aria-label="Main navigation"
              className={menu ? 'open' : ''}
            >
              {visibleNavigationLinks.map(([label, href], index) => (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  ref={index === 0 ? firstLinkRef : undefined}
                  aria-current={
                    pathname === href || current === label.toLowerCase() ? 'page' : undefined
                  }
                  onClick={(event) => {
                    closeMenu();
                    navigateWithDocument(event);
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-button"
              onClick={toggleMenu}
              aria-expanded={menu}
              aria-controls="navigation"
              aria-label={menu ? 'Close main navigation' : 'Open main navigation'}
            >
              {menu ? 'Close' : 'Menu'}{' '}
              <span aria-hidden="true">{menu ? '−' : '☰'}</span>
            </button>
          </div>
          <Link
            className="hire-pill"
            href="/contact"
            prefetch={false}
            onClick={navigateWithDocument}
          >
            <span aria-hidden="true">
              <ArrowUpRight size={22} />
            </span>{' '}
            Discuss your project
          </Link>
        </div>
      </header>
    </>
  );
}

export function StudioFooter() {
  return (
    <footer className="studio-footer studio-footer-rich">
      <Image
        className="studio-footer-image"
        src="/assets/footer/webstell-footer.avif"
        alt=""
        fill
        sizes="100vw"
      />
      <div className="studio-footer-shade" aria-hidden="true" />
      <div className="studio-footer-panel studio-width">
        <div className="studio-footer-intro">
          <Link href="/" className="studio-footer-brand">
            WEBSTELL
          </Link>
          <p>Ideas into things people use.</p>
          <Link className="studio-footer-call" href="/contact">
            <span>Have a project in mind?</span>
            Discuss your project <ArrowUpRight size={18} />
          </Link>
        </div>
        <nav className="studio-footer-links" aria-label="Footer navigation">
          <div>
            <span>EXPLORE</span>
            <Link href="/">Home</Link>
            <Link href="/projects">See our work</Link>
            <Link href="/services">Services</Link>
          </div>
          <div>
            <span>START HERE</span>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Discuss your project</Link>
            <Link href="/schedule">Request a call</Link>
          </div>
          <div className="studio-footer-policies">
            <span>POLICIES</span>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/cookies">Cookie Policy</Link>
            <Link href="/refunds">Refund &amp; Cancellation</Link>
            <Link href="/accessibility">Accessibility</Link>
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
