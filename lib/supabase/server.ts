// lib/supabase/server.ts
// Supabase client using the SERVICE ROLE key — for server-only use.
// NEVER import this in client components or expose to the browser.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

function assertEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing environment variable: ${key}`);
  return val;
}

/**
 * Service-role Supabase client. Bypasses RLS.
 * Use only in API Route Handlers and Server Actions.
 */
export function createServiceClient() {
  return createClient<Database>(
    assertEnv("NEXT_PUBLIC_SUPABASE_URL"),
    assertEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * Anon Supabase client for public reads (governed by RLS).
 * Safe to use in Server Components for read-only data.
 */
export function createAnonClient() {
  return createClient<Database>(
    assertEnv("NEXT_PUBLIC_SUPABASE_URL"),
    assertEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      auth: { persistSession: false },
    }
  );
}
