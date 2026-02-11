-- ============================================================
-- NYC Department of Tenderness — Supabase Setup
-- Run this in: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. Create the table
CREATE TABLE love_incidents (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz NOT NULL    DEFAULT now(),
  nickname      text,
  location      text        NOT NULL,
  incident_type text,
  story         text        NOT NULL,
  era           text,
  tenderness_level int      NOT NULL    CHECK (tenderness_level BETWEEN 1 AND 5)
);

-- 2. Index for newest-first retrieval
CREATE INDEX idx_love_incidents_created_at ON love_incidents (created_at DESC);

-- 3. Enable Row Level Security
ALTER TABLE love_incidents ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — allow anon users to SELECT, INSERT, and DELETE
--    (DELETE is intentionally open for this short-lived art installation)

CREATE POLICY "Allow public read"
  ON love_incidents
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert"
  ON love_incidents
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public delete"
  ON love_incidents
  FOR DELETE
  TO anon
  USING (true);
