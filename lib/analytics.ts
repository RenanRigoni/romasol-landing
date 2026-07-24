export type AnalyticsEvent =
  | "hero_cta_click"
  | "calculator_started"
  | "calculator_completed"
  | "calculator_lead_click"
  | "customer_profile_selected"
  | "project_case_viewed"
  | "whatsapp_click"
  | "lead_form_started"
  | "lead_form_submitted"
  | "faq_opened";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
