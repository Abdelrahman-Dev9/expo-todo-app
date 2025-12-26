import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://tiaqidcvihcgdvdqxuzr.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpYXFpZGN2aWhjZ2R2ZHF4dXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1NjE2NzMsImV4cCI6MjA4MjEzNzY3M30.Q4tEj1HxkYnCpkcvYGxc9lh7VYZEkdSVAz5OJXCmBzA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
