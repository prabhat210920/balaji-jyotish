// lib/date-utils.ts
// Robust date & time formatting utilities for Balaji Jyotish.
// Handles PostgreSQL DATE, TIME, and TIMESTAMPTZ columns without timezone shift glitches.

/**
 * Formats a SQL time string ("10:00:00" or "10:00") or ISO string to 12-hour format ("10:00 AM").
 */
export function formatSlotTime(timeStr?: string | null): string {
  if (!timeStr) return "N/A";

  if (timeStr.includes("T")) {
    const d = new Date(timeStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  }

  const parts = timeStr.split(":");
  if (parts.length >= 2) {
    const h = parseInt(parts[0], 10);
    const m = parts[1];
    if (!isNaN(h)) {
      const ampm = h >= 12 ? "PM" : "AM";
      const formattedH = h % 12 || 12;
      return `${formattedH}:${m} ${ampm}`;
    }
  }

  return timeStr;
}

/**
 * Formats a SQL date string ("2026-10-15") or ISO string to "15 Oct 2026" or "Thu, 15 Oct".
 * Uses local calendar construction to prevent UTC date shifting.
 */
export function formatSlotDate(
  dateStr?: string | null,
  options?: { includeWeekday?: boolean; includeYear?: boolean; short?: boolean }
): string {
  if (!dateStr) return "N/A";

  const clean = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const parts = clean.split("-").map(Number);

  if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString("en-IN", {
      ...(options?.includeWeekday ? { weekday: "short" } : {}),
      day: "numeric",
      month: options?.short ? "short" : "short",
      ...(options?.includeYear !== false ? { year: "numeric" } : {}),
    });
  }

  const fallbackDate = new Date(dateStr);
  if (!isNaN(fallbackDate.getTime())) {
    return fallbackDate.toLocaleDateString("en-IN", {
      ...(options?.includeWeekday ? { weekday: "short" } : {}),
      day: "numeric",
      month: "short",
      ...(options?.includeYear !== false ? { year: "numeric" } : {}),
    });
  }

  return dateStr;
}

/**
 * Safely formats both slot_date and start_time together.
 * e.g. "15 Oct 2026, 10:00 AM" or "Thu, 15 Oct • 10:00 AM"
 */
export function formatSlotDateTime(
  slotDate?: string | null,
  startTime?: string | null,
  options?: { includeWeekday?: boolean; includeYear?: boolean }
): string {
  if (!slotDate && !startTime) return "—";

  if (slotDate && startTime) {
    const d = formatSlotDate(slotDate, options);
    const t = formatSlotTime(startTime);
    return `${d}, ${t}`;
  }

  if (slotDate) {
    return formatSlotDate(slotDate, options);
  }

  return formatSlotTime(startTime);
}

/**
 * Safely formats timestamp strings (such as created_at or held_until).
 */
export function formatTimestamp(
  isoStr?: string | null,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!isoStr) return "—";
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return "—";

  return d.toLocaleString("en-IN", options ?? {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
