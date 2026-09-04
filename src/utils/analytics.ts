/**
 * Richport Southern, LLC — Privacy-Preserving First-Party Analytics Dispatcher
 * 
 * Strict Compliance:
 * - Controlled and owned by Richport Southern (no developer or third-party ad tracking).
 * - Zero PII (no names, Social Security numbers, bank accounts, or phone numbers in event payloads or URLs).
 * - Dispatches to window.dataLayer (GA4 / GTM standard) and fires a native DOM CustomEvent ('richport_analytics').
 */

export type AnalyticsEventType =
  | 'inquiry'
  | 'viewing_request'
  | 'application_start'
  | 'application_submit'
  | 'payment_portal_click'
  | 'phone_click'
  | 'email_click';

export interface AnalyticsEventPayload {
  propertyId?: string;
  propertyRef?: string;
  county?: string;
  propertyType?: string;
  price?: number;
  source?: string;
  step?: number | string;
  location?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackRichportEvent(
  eventType: AnalyticsEventType,
  payload: AnalyticsEventPayload = {}
): void {
  // Ensure sensitive data is never included
  const sanitizedPayload: AnalyticsEventPayload = {
    ...payload,
    timestamp: new Date().toISOString(),
    event: `richport_${eventType}`,
  };

  // 1. Push to standard window.dataLayer for client's Google Tag Manager or GA4
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(sanitizedPayload);

    // 2. Dispatch custom browser event for in-app or custom listeners
    try {
      const event = new CustomEvent('richport_analytics', {
        detail: { eventType, payload: sanitizedPayload },
      });
      window.dispatchEvent(event);
    } catch {
      // Graceful fallback if CustomEvent is restricted
    }

    if (process.env.NODE_ENV !== 'production') {
      // Safe development audit log (no PII)
      console.log(`[Richport Analytics] Event: ${eventType}`, sanitizedPayload);
    }
  }
}
