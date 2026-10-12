// lib/supabase/client.ts
// Browser Supabase client using @supabase/ssr — the modern approach.
// Uses NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (replaces the legacy ANON_KEY).

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

/**
 * Creates a browser-safe Supabase client.
 * Manages auth cookies automatically on the client side.
 * Use inside Client Components ('use client').
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
