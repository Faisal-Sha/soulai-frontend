import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

/**
 * Verify that the request is authorized with the service_role key.
 * Uses Supabase auth.getUser() to cryptographically verify the JWT,
 * then checks the role claim. This prevents forged JWTs from bypassing auth.
 */
export async function isServiceRole(req: Request): Promise<boolean> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  try {
    // First: verify the JWT signature via Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");
    if (!supabaseUrl || !supabaseKey) return false;

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    // This call verifies the JWT signature server-side
    const { error } = await supabase.auth.getUser(token);

    // Service role tokens will fail getUser() but are still valid —
    // fall back to checking the JWT secret directly
    if (error) {
      const jwtSecret = Deno.env.get("SUPABASE_JWT_SECRET");
      if (!jwtSecret) {
        // If no JWT secret available, decode and verify the token
        // matches the known service role key as a safeguard
        const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        if (!serviceRoleKey) return false;
        return token === serviceRoleKey;
      }

      // Verify JWT with HMAC-SHA256
      const { verifyJWT } = await import("./jwt-verify.ts");
      return await verifyJWT(token, jwtSecret, "service_role");
    }

    // If getUser succeeded, it's a user token — check if service_role
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role === "service_role";
  } catch {
    return false;
  }
}
