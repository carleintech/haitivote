/**
 * Supabase Admin Client
 * ONLY use in API routes on the server
 * Has full access, bypasses RLS
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/database';

export const createAdminClient = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
};

// Singleton for admin client
let adminClient: ReturnType<typeof createAdminClient> | null = null;

export const getAdminClient = () => {
  if (!adminClient) {
    adminClient = createAdminClient();
  }
  return adminClient;
};
