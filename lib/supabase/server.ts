// lib/supabase/server.ts
// Service-role Supabase client — bypasses RLS entirely.
// ONLY for use in server-side code (API routes, Server Actions).
// NEVER import this file in client components or expose to the browser.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Service-role client — bypasses all Row Level Security.
 * Used exclusively by API routes to write client, booking, and payment data.
 */
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variables.\n" +
      "Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY\n" +
      "Copy .env.local.example to .env.local and fill in your Supabase project credentials."
    );
  }

  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
