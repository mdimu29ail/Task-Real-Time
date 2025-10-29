import { createClient } from '@supabase/supabase-js';

// // ✅ Define your Supabase credentials safely
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  'https://ahlryolxsxvzqvkrsyph.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFobHJ5b2x4c3h2enF2a3JzeXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDM5NDgsImV4cCI6MjA3Njk3OTk0OH0.P0DTCLGlFmtxCj20yKPv4AxLBkw26kq7cOAfBQuOX6g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
