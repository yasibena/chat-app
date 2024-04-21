

import { createClient } from '@supabase/supabase-js'

//set your supabaseUrl and supabaseKey(after sign up in supabase website)
export const supabase = createClient(
  "Your_supabaseUrl",
  "Your_supabaseKey"
);
