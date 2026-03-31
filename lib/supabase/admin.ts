import { createClient } from "@supabase/supabase-js";
import "server-only";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const supabaseUrl = requireEnv("NEXT_PUBLIC_SUPABASE_URL");
const supabaseServiceRoleKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");

/**
 * Creates an admin Supabase client that uses the service-role key.
 * Bypasses RLS entirely — use only in trusted server-side code
 * (webhooks, background jobs, admin actions).
 *
 * NEVER import this module in client components.
 */
export function createAdminSupabaseClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
