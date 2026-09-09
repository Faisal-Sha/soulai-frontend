-- Idempotency helper for Stripe agent credit PaymentIntents.

CREATE OR REPLACE FUNCTION public.agent_credits_already_applied(p_payment_intent_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.agent_credit_ledger l
    WHERE l.meta->>'stripe_payment_intent_id' = p_payment_intent_id
  );
$$;

REVOKE ALL ON FUNCTION public.agent_credits_already_applied(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.agent_credits_already_applied(text)
  TO anon, authenticated, service_role;
