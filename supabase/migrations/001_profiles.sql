/*
 * Migration: 001_profiles
 *
 * Creates the `profiles` table for storing user metadata synced from Clerk.
 *
 * RLS status
 * ----------
 * Row Level Security is ENABLED on this table. The policies below use
 * `auth.jwt()->>'sub'` which maps to the Clerk user ID inside a
 * Clerk-issued JWT. Until Clerk is connected, these policies will block
 * all access through the anon/authenticated client.
 *
 * For testing before Clerk is set up, use the admin client (service role
 * key) which bypasses RLS entirely — see lib/supabase/admin.ts.
 *
 * Clerk integration notes
 * -----------------------
 * The `id` column should be populated with the Clerk user ID
 * (e.g. "user_2abc...") on sign-up, via a Clerk webhook or a server
 * action once Clerk is integrated.
 *
 * To make RLS work with Clerk JWTs:
 *   1. Create a JWT template named "supabase" in the Clerk dashboard.
 *   2. Set the signing key to your Supabase project's JWT secret
 *      (Supabase Dashboard > Settings > API > JWT Settings).
 *   3. The template's `sub` claim should map to {{user.id}} (default).
 *
 * Test profiles (already in the database)
 * ----------------------------------------
 * These rows can be used to verify Clerk + RLS integration:
 *   - id: "test_customer", role: "customer", email: customer@test.com
 *   - id: "test_admin",    role: "admin",    email: admin@test.com
 * Once Clerk is working, replace these with real Clerk user IDs.
 */

-- 1. Create the profiles table
CREATE TABLE profiles (
  id         text        PRIMARY KEY,
  role       text        NOT NULL DEFAULT 'customer'
             CHECK (role IN ('customer', 'admin')),
  email      text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. RLS policies (require a Clerk JWT to pass)

-- Users can read their own profile
CREATE POLICY "Users can select their own profile"
  ON profiles
  FOR SELECT
  USING ((auth.jwt() ->> 'sub') = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING ((auth.jwt() ->> 'sub') = id);
