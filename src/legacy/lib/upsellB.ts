import { supabase } from '@/integrations/supabase/client';

const FN = 'upsell-b';

type UpsellCheckResponse = {
  eligible?: boolean;
  reason?: string;
  retry?: boolean;
  userId?: string;
  email?: string;
  planType?: string;
  subscription_purchase?: {
    session_id: string;
    plan_type?: string;
    amount?: number;
    currency?: string;
  };
  error?: string;
};

type UpsellChargeResponse = {
  success?: boolean;
  error?: string;
  paymentIntentId?: string;
};

async function invoke<T>(body: Record<string, unknown>, token?: string): Promise<T> {
  const { data, error } = await supabase.functions.invoke(FN, {
    body,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (error) throw new Error(error.message);
  return data as T;
}

/** Eligibility after Stripe checkout (guest-safe). */
export async function upsellCheck(sessionId: string) {
  return invoke<UpsellCheckResponse>({ action: 'check', sessionId });
}

/** Skip — never show offer again. */
export async function upsellMarkOffered(userId: string) {
  return invoke<{ success?: boolean }>({ action: 'markOffered', userId });
}

/** Accept — $9.99 off-session charge (post-checkout upsell page). */
export async function upsellCharge(sessionId: string, userId: string, accessToken?: string) {
  return invoke<UpsellChargeResponse>(
    { action: 'charge', sessionId, userId },
    accessToken,
  );
}

/** $9.99 from Compatibility page (logged-in, card on file). */
export async function upsellPurchaseStandalone(accessToken: string) {
  return invoke<UpsellChargeResponse>(
    { action: 'purchaseStandalone' },
    accessToken,
  );
}
