

import { createClient } from '@supabase/supabase-js'

//set YOur supabaseUrl and supabaseKey
export const supabase = createClient(
  "Your_supabaseUrl",
  "Your_supabaseKey"
);
