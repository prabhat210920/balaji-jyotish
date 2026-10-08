// lib/supabase/client.ts
// Browser-safe Supabase client using the public anon key (governed by RLS).
// Used in Client Components for read-only public data.

"use client";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

let client: ReturnType<typeof createClient<Database>> | null = null;

export function getBrowserClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Copy .env.local.example to .env.local and fill in your Supabase credentials."
    );
  }

  client = createClient<Database>(url, key, {
    auth: { persistSession: false },
  });

  return client;
}
