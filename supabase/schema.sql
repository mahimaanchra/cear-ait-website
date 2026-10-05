-- ================================================================
-- CEAR AIT Portal - Supabase Production Schema & Storage Policies
-- ================================================================
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Site Dynamic Content Table (used by /admin CMS)
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read published site content
CREATE POLICY "Public read site content"
  ON public.site_content
  FOR SELECT
  USING (true);

-- Allow upsert/update with anon key or service role
CREATE POLICY "Allow update site content"
  ON public.site_content
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------------
-- 2. Registrations Table (Wartech 2026 & Annual Cadre Inductions)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.registrations (
  id TEXT PRIMARY KEY,
  registration_type TEXT NOT NULL CHECK (registration_type IN ('inductions', 'wartech')),
  applicant_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  track_or_domain TEXT NOT NULL,
  team_name TEXT,
  team_size TEXT,
  college TEXT,
  statement TEXT,
  meta JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'shortlisted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for registrations
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow public to submit registrations
CREATE POLICY "Allow public insert registrations"
  ON public.registrations
  FOR INSERT
  WITH CHECK (true);

-- Read access restricted to authenticated/service role (or anon with read policy)
CREATE POLICY "Allow select registrations"
  ON public.registrations
  FOR SELECT
  USING (true);

-- ----------------------------------------------------------------
-- 3. Inquiries Table (Contact & FAQ section)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'responded', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public to submit inquiries
CREATE POLICY "Allow public insert inquiries"
  ON public.inquiries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow select inquiries"
  ON public.inquiries
  FOR SELECT
  USING (true);

-- ----------------------------------------------------------------
-- 4. Storage Bucket Setup for Media & Photographs
-- ----------------------------------------------------------------
-- Insert storage bucket for CEAR media if not present
INSERT INTO storage.buckets (id, name, public)
VALUES ('cear-media', 'cear-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Bucket policy: Allow public read of cear-media
CREATE POLICY "Allow public read of cear-media"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'cear-media');

-- Bucket policy: Allow insert of cear-media
CREATE POLICY "Allow upload to cear-media"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'cear-media');

-- Bucket policy: Allow update/upsert of cear-media
CREATE POLICY "Allow update to cear-media"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'cear-media');
