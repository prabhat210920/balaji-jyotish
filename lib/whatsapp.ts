// lib/whatsapp.ts
// Central WhatsApp configuration and link generation for Balaji Jyotish
import { SITE_CONFIG } from "@/lib/site-config";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || SITE_CONFIG.whatsappNumber;

export const WHATSAPP_DISPLAY_PHONE = SITE_CONFIG.phone;

export const DEFAULT_BOOKING_MESSAGE =
  "Namaste Guruji, I would like to book an astrology consultation.";

/**
 * Builds a direct WhatsApp chat URL with an optional pre-defined message.
 */
export function getWhatsAppUrl(message: string = DEFAULT_BOOKING_MESSAGE): string {
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

/**
 * Pre-defined WhatsApp message for specific astrology services.
 */
export function getServiceWhatsAppUrl(serviceTitle: string): string {
  const message = `Namaste Guruji, I would like to book a consultation for "${serviceTitle}". Please let me know the available timings.`;
  return getWhatsAppUrl(message);
}

/**
 * Pre-defined WhatsApp message when user sends inquiry from Contact form.
 */
export function getContactFormWhatsAppUrl(details: {
  name: string;
  phone: string;
  service?: string;
  message: string;
}): string {
  const parts = [
    `Namaste Guruji,`,
    `My Name: ${details.name}`,
    `Phone: ${details.phone}`,
    details.service ? `Service: ${details.service}` : null,
    `Message: ${details.message}`,
  ].filter(Boolean);

  return getWhatsAppUrl(parts.join("\n"));
}
