import { supabase } from '@/integrations/supabase/client';

const PREMIUM_PLANS = new Set(['premium', 'premium_12week']);

/**
 * Client-side deep-dive access check (no edge function).
 * Uses RLS: user can read own subscriptions + upsell_purchases.
 */
export async function hasDeepDiveAccessClient(userId: string): Promise<boolean> {
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('plan_type')
    .eq('user_id', userId)
    .maybeSingle();

  if (sub?.plan_type && PREMIUM_PLANS.has(sub.plan_type)) {
    return true;
  }

  const { data: purchase } = await supabase
    .from('upsell_purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('addon', 'compatibility_deep_dive')
    .maybeSingle();

  return !!purchase;
}

export async function checkDeepDiveAccess(): Promise<{
  hasAccess: boolean;
  reason?: string;
}> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    return { hasAccess: false, reason: 'not_logged_in' };
  }

  const hasAccess = await hasDeepDiveAccessClient(session.user.id);
  return { hasAccess };
}
