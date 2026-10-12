// lib/supabase/server-session.ts
// Server-side Supabase clients using @supabase/ssr — the modern approach.
// Uses NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (replaces the legacy ANON_KEY).

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * Creates a Supabase client that reads/writes session cookies.
 * Use in Server Components, Server Actions, and Route Handlers
 * when you need access to the authenticated user's session.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — cookies are read-only here.
            // The middleware handles session refresh so this is safe to ignore.
          }
        },
      },
    }
  );
}

/**
 * Requires an authenticated admin session.
 * Returns the user if authenticated; throws "UNAUTHORIZED" if not.
 * Use at the top of admin API route handlers.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("UNAUTHORIZED");
  }

  return user;
}
