-- Track whether Upsell B (Compatibility Deep-Dive) has been offered to a user
-- Used server-side to prevent double-charging, in addition to the client-side localStorage flag

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS upsell_b_offered boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.profiles.upsell_b_offered IS
  'Set to true after Upsell B ($9.99 Compatibility Deep-Dive) is offered. Never shown again once true.';
