import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && (supabaseAnonKey || supabaseServiceKey));
}

// Client for server-side operations (uses service key if available for full access, else anon key)
export function getSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;
  const key = supabaseServiceKey || supabaseAnonKey;
  if (!supabaseUrl || !key) return null;
  return createClient(supabaseUrl, key, {
    auth: { persistSession: false },
  });
}

// Client for browser-side operations
export function getSupabaseBrowserClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;
  return createClient(supabaseUrl, supabaseAnonKey);
}

export const SUPABASE_BUCKET_NAME = "cear-media";

export const SUPABASE_TABLES = {
  REGISTRATIONS: "registrations",
  INQUIRIES: "inquiries",
  SITE_CONTENT: "site_content",
} as const;

export type SupabaseTableName = (typeof SUPABASE_TABLES)[keyof typeof SUPABASE_TABLES];

export interface SupabaseHealthResult {
  configured: boolean;
  reachable: boolean;
  latencyMs?: number;
  error?: string;
}

/**
 * Checks connectivity to the Supabase cloud instance.
 * Gracefully degrades if credentials are not configured in local environment.
 */
export async function checkSupabaseHealth(): Promise<SupabaseHealthResult> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      reachable: false,
    };
  }

  const client = getSupabaseServerClient();
  if (!client) {
    return {
      configured: true,
      reachable: false,
      error: "Client instantiation failed",
    };
  }

  const start = Date.now();
  try {
    const { error } = await client
      .from(SUPABASE_TABLES.SITE_CONTENT)
      .select("key")
      .limit(1);

    if (error && error.code !== "PGRST116" && !error.message.includes("does not exist")) {
      return {
        configured: true,
        reachable: false,
        latencyMs: Date.now() - start,
        error: error.message,
      };
    }

    return {
      configured: true,
      reachable: true,
      latencyMs: Date.now() - start,
    };
  } catch (err: unknown) {
    return {
      configured: true,
      reachable: false,
      latencyMs: Date.now() - start,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
