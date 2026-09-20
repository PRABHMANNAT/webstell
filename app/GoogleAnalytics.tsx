'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { trackAnalyticsEvent, type AnalyticsEventName } from '../lib/analytics';
import { CONSENT_STORAGE_KEY } from '../lib/consent';

const measurementId = 'G-FG7X5G0MDL';
const whatsappHosts = new Set([
  'wa.me',
  'whatsapp.com',
  'www.whatsapp.com',
  'api.whatsapp.com',
]);

function linkLocation(anchor: HTMLAnchorElement) {
  if (anchor.closest('nav')) return 'navigation' as const;
  if (anchor.closest('footer')) return 'footer' as const;
  return 'content' as const;
}

function trackedLink(anchor: HTMLAnchorElement): {
  eventName: AnalyticsEventName;
  ctaName: 'whatsapp' | 'email' | 'phone' | 'schedule_project_call';
} | null {
  const href = anchor.getAttribute('href')?.trim() || '';
  if (/^mailto:/i.test(href)) {
    return { eventName: 'email_click', ctaName: 'email' };
  }
  if (/^tel:/i.test(href)) {
    return { eventName: 'phone_click', ctaName: 'phone' };
  }

  try {
    const url = new URL(href, window.location.href);
    if (whatsappHosts.has(url.hostname.toLowerCase())) {
      return { eventName: 'whatsapp_click', ctaName: 'whatsapp' };
    }
    if (url.origin === window.location.origin && url.pathname === '/schedule') {
      return {
        eventName: 'schedule_call_click',
        ctaName: 'schedule_project_call',
      };
    }
  } catch {
    return null;
  }

  return null;
}

export default function GoogleAnalytics() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) return;

      const tracked = trackedLink(anchor);
      if (!tracked) return;

      trackAnalyticsEvent(tracked.eventName, {
        link_location: linkLocation(anchor),
        cta_name: tracked.ctaName,
      });
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return (
    <>
      <Script id="google-analytics-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var webstellAnalyticsConsent = 'denied';
try {
  webstellAnalyticsConsent = localStorage.getItem('${CONSENT_STORAGE_KEY}') === 'accepted' ? 'granted' : 'denied';
} catch (error) {}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: webstellAnalyticsConsent,
  functionality_storage: 'granted',
  security_storage: 'granted',
  personalization_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
      <Script
        id="google-analytics-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        async
      />
    </>
  );
}
