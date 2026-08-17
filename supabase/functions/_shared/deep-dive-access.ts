import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type AdminClient = ReturnType<typeof createClient>;

const PREMIUM_PLANS = new Set(["premium", "premium_12week"]);

/** True if user bought Upsell B or has premium plan with deep-dive included. */
export async function hasDeepDiveAccess(
  admin: AdminClient,
  userId: string,
): Promise<boolean> {
  const { data: sub } = await admin
    .from("subscriptions")
    .select("plan_type, status")
    .eq("user_id", userId)
    .maybeSingle();

  if (sub?.plan_type && PREMIUM_PLANS.has(sub.plan_type)) {
    return true;
  }

  const { data: purchase } = await admin
    .from("upsell_purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("addon", "compatibility_deep_dive")
    .maybeSingle();

  return !!purchase;
}
