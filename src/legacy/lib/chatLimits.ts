/** Active subscription statuses that grant plan-based free message quotas */
export const ACTIVE_SUBSCRIPTION_STATUSES = new Set([
  "active",
  "trialing",
  "past_due",
]);

/** Cost per message after free quota is exhausted (USD) */
export const CHAT_MESSAGE_COST = 0.15;

/**
 * Free AI chat messages included per plan (lifetime quota, not per billing period).
 * Canonical Stripe SKUs: trial_1week, plan_4week, premium_12week
 */
export function getChatFreeMessageLimit(planType: string | null | undefined): number {
  switch (planType) {
    // 3 messages — trial tier
    case "trial":
    case "trial_1week":
    case "basic":
    case "discovery":
      return 3;

    // 10 messages — mid tier (includes new single-plan offer)
    case "fullAccess":
    case "full_access_7day":
    case "popular":
    case "slim":
    case "growth":
    case "plan_4week":
      return 10;

    // 20 messages — premium tier
    case "bestValue":
    case "full":
    case "premium":
    case "premium_12week":
    case "99.9":
      return 20;

    case "free":
    case null:
    case undefined:
      return 1;

    default:
      return 1;
  }
}

export function resolveChatPlanType(
  planType: string | null | undefined,
  status: string | null | undefined,
): string {
  if (!planType || !status) return "free";
  if (!ACTIVE_SUBSCRIPTION_STATUSES.has(status.toLowerCase())) return "free";
  return planType;
}
