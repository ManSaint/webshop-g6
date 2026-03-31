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
const supabaseAnonKey = requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY");

// TODO: When Clerk is integrated, make this function async and pass the
// user's JWT so RLS policies can resolve `auth.jwt()->>'sub'`:
//
// import { auth } from "@clerk/nextjs/server";
//
// export async function createServerSupabaseClient() {
//   const { getToken } = await auth();
//   return createClient(supabaseUrl, supabaseAnonKey, {
//     accessToken: async () => {
//       const token = await getToken({ template: "supabase" });
//       return token ?? "";
//     },
//   });
// }
//
// This will activate the RLS policies in supabase/migrations/001_profiles.sql

export function createServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
