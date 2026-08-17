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

export interface ChatBillingResult {
  billedAs: "free" | "paid";
  balance: number;
  freeMessagesUsed: number;
  remainingFree: number;
  freeLimit: number;
}

/** Apply free-quota increment or balance deduction BEFORE generating AI response. */
export async function applyChatBilling(
  adminClient: { from: (table: string) => any },
  userId: string,
  profile: { balance?: unknown; free_messages_count?: unknown },
  freeLimit: number,
): Promise<ChatBillingResult> {
  const usedFree = Number(profile.free_messages_count) || 0;
  const balance = Number(profile.balance) || 0;

  if (usedFree < freeLimit) {
    const newUsed = usedFree + 1;
    const { error } = await adminClient
      .from("profiles")
      .update({ free_messages_count: newUsed })
      .eq("id", userId);

    if (error) {
      throw new Error(`Failed to update free message count: ${error.message}`);
    }

    return {
      billedAs: "free",
      balance,
      freeMessagesUsed: newUsed,
      remainingFree: Math.max(0, freeLimit - newUsed),
      freeLimit,
    };
  }

  if (balance < CHAT_MESSAGE_COST) {
    throw new Error("LIMIT_REACHED");
  }

  const newBalance = Math.round((balance - CHAT_MESSAGE_COST) * 100) / 100;
  const { error } = await adminClient
    .from("profiles")
    .update({ balance: newBalance })
    .eq("id", userId);

  if (error) {
    throw new Error(`Failed to deduct balance: ${error.message}`);
  }

  return {
    billedAs: "paid",
    balance: newBalance,
    freeMessagesUsed: usedFree,
    remainingFree: 0,
    freeLimit,
  };
}

/** Roll back billing if AI generation fails after charge. */
export async function rollbackChatBilling(
  adminClient: { from: (table: string) => any },
  userId: string,
  billing: ChatBillingResult,
): Promise<void> {
  if (billing.billedAs === "free") {
    const restored = Math.max(0, billing.freeMessagesUsed - 1);
    await adminClient
      .from("profiles")
      .update({ free_messages_count: restored })
      .eq("id", userId);
    return;
  }

  const restoredBalance = Math.round((billing.balance + CHAT_MESSAGE_COST) * 100) / 100;
  await adminClient
    .from("profiles")
    .update({ balance: restoredBalance })
    .eq("id", userId);
}
