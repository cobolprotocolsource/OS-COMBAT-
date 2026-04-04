/*
  # Create Core Tables for OS COMBAT

  1. New Tables
    - `personel`
      - `id` (uuid, primary key)
      - `nrp` (text, unique, 3-10 digits)
      - `nama` (text, required)
      - `pangkat` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `pos`
      - `id` (uuid, primary key)
      - `kode` (text, unique, required)
      - `nama` (text, required)
      - `lokasi` (text, optional)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `audit_logs`
      - `id` (uuid, primary key)
      - `action` (text, required)
      - `details` (jsonb, optional)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Audit logs readable by authenticated users only
  
  3. Indexes
    - Add indexes on frequently queried columns (nrp, kode)
*/

-- Create personel table
CREATE TABLE IF NOT EXISTS personel (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nrp text UNIQUE NOT NULL CHECK (nrp ~ '^\d{3,10}$'),
  nama text NOT NULL,
  pangkat text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create pos table
CREATE TABLE IF NOT EXISTS pos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kode text UNIQUE NOT NULL,
  nama text NOT NULL,
  lokasi text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL,
  details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE personel ENABLE ROW LEVEL SECURITY;
ALTER TABLE pos ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Policies for personel
CREATE POLICY "Authenticated users can read personel"
  ON personel FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert personel"
  ON personel FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update personel"
  ON personel FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete personel"
  ON personel FOR DELETE
  TO authenticated
  USING (true);

-- Policies for pos
CREATE POLICY "Authenticated users can read pos"
  ON pos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert pos"
  ON pos FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update pos"
  ON pos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete pos"
  ON pos FOR DELETE
  TO authenticated
  USING (true);

-- Policies for audit_logs
CREATE POLICY "Authenticated users can read audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_personel_nrp ON personel(nrp);
CREATE INDEX IF NOT EXISTS idx_pos_kode ON pos(kode);
CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
CREATE TRIGGER update_personel_updated_at
  BEFORE UPDATE ON personel
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pos_updated_at
  BEFORE UPDATE ON pos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();