export type AnalyticsEventName =
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  | 'contact_form_submit'
  | 'schedule_call_click'
  | 'pricing_calculator_complete'
  | 'project_enquiry';

export type AnalyticsEventParameters = {
  link_location?: 'navigation' | 'footer' | 'content';
  cta_name?:
    | 'whatsapp'
    | 'email'
    | 'phone'
    | 'schedule_project_call'
    | 'contact_project_brief'
    | 'website_project_brief'
    | 'pricing_estimate_enquiry';
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  parameters: AnalyticsEventParameters = {},
) {
  if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
    return;
  }

  try {
    window.dataLayer ||= [];
    window.gtag ||= (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag('event', eventName, {
      page_path: window.location.pathname,
      ...parameters,
    });
  } catch {
    // Analytics must never interrupt navigation or form success handling.
  }
}
