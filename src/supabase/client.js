

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  "Your_supabaseUrl",
  "Your_supabaseKey"
);