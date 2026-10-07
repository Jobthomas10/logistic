-- ====================================================================
-- LORRYMITRA AI - PRODUCTION SUPABASE DATABASE SCHEMA
-- Bilingual Malayalam-English Logistics Assistant
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER PROFILES TABLE
-- Linked to Supabase Auth (auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT,
    phone TEXT,
    role TEXT DEFAULT 'driver', -- 'driver' | 'lorry_owner' | 'fleet_operator' | 'contractor'
    company_name TEXT,
    preferred_language TEXT DEFAULT 'ml',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Trigger to auto-create profile on Supabase auth user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, phone, role, company_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', 'LorryMitra User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'driver'),
    COALESCE(NEW.raw_user_meta_data->>'company_name', '')
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email,
      updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- 'E-Way Bill', 'Invoice', 'Delivery Note', 'Consignment Note', etc.
    document_number TEXT,
    vehicle_number TEXT,
    pickup_location TEXT,
    delivery_location TEXT,
    consignor TEXT,
    consignee TEXT,
    cargo_description TEXT,
    quantity TEXT,
    unit TEXT,
    weight TEXT,
    invoice_value TEXT,
    document_date TEXT,
    expiry_date TEXT,
    transporter TEXT,
    delivery_instructions TEXT,
    file_path TEXT,
    file_url TEXT,
    extracted_data JSONB DEFAULT '{}'::jsonb,
    malayalam_summary JSONB DEFAULT '{}'::jsonb,
    validity_status TEXT DEFAULT 'VALID', -- 'VALID' | 'EXPIRING' | 'EXPIRED'
    status TEXT DEFAULT 'completed', -- 'processing' | 'completed' | 'failed'
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 4. VEHICLES TABLE
CREATE TABLE IF NOT EXISTS public.vehicles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    vehicle_number TEXT NOT NULL,
    vehicle_type TEXT DEFAULT 'Goods Vehicle',
    driver_name TEXT,
    driver_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 5. DELIVERIES TABLE
CREATE TABLE IF NOT EXISTS public.deliveries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
    pickup TEXT NOT NULL,
    destination TEXT NOT NULL,
    customer TEXT,
    cargo TEXT,
    vehicle TEXT,
    status TEXT DEFAULT 'In Transit', -- 'Pending' | 'In Transit' | 'Delivered' | 'Cancelled'
    delivery_date TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 6. AI QUERIES TABLE (Ask LorryMitra Voice / Chat History)
CREATE TABLE IF NOT EXISTS public.queries (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    document_id UUID REFERENCES public.documents(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    language TEXT DEFAULT 'ml',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: User A can NEVER see or modify User B's records
-- ====================================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queries ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Documents Policies
DROP POLICY IF EXISTS "Users can select own documents" ON public.documents;
CREATE POLICY "Users can select own documents"
  ON public.documents FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own documents" ON public.documents;
CREATE POLICY "Users can insert own documents"
  ON public.documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own documents" ON public.documents;
CREATE POLICY "Users can update own documents"
  ON public.documents FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own documents" ON public.documents;
CREATE POLICY "Users can delete own documents"
  ON public.documents FOR DELETE
  USING (auth.uid() = user_id);

-- Vehicles Policies
DROP POLICY IF EXISTS "Users can select own vehicles" ON public.vehicles;
CREATE POLICY "Users can select own vehicles"
  ON public.vehicles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own vehicles" ON public.vehicles;
CREATE POLICY "Users can insert own vehicles"
  ON public.vehicles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own vehicles" ON public.vehicles;
CREATE POLICY "Users can update own vehicles"
  ON public.vehicles FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own vehicles" ON public.vehicles;
CREATE POLICY "Users can delete own vehicles"
  ON public.vehicles FOR DELETE
  USING (auth.uid() = user_id);

-- Deliveries Policies
DROP POLICY IF EXISTS "Users can select own deliveries" ON public.deliveries;
CREATE POLICY "Users can select own deliveries"
  ON public.deliveries FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own deliveries" ON public.deliveries;
CREATE POLICY "Users can insert own deliveries"
  ON public.deliveries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own deliveries" ON public.deliveries;
CREATE POLICY "Users can update own deliveries"
  ON public.deliveries FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own deliveries" ON public.deliveries;
CREATE POLICY "Users can delete own deliveries"
  ON public.deliveries FOR DELETE
  USING (auth.uid() = user_id);

-- Queries Policies
DROP POLICY IF EXISTS "Users can select own queries" ON public.queries;
CREATE POLICY "Users can select own queries"
  ON public.queries FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own queries" ON public.queries;
CREATE POLICY "Users can insert own queries"
  ON public.queries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ====================================================================
-- SUPABASE STORAGE BUCKET: documents
-- ====================================================================
-- Run the following to create the bucket and secure it if storage schema exists:
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Users can only upload, read, and delete within their own folder: userId/*
CREATE POLICY "Allow authenticated users to upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Allow authenticated users to read their documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Allow authenticated users to delete their documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);
