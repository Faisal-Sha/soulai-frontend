/** @deprecated Deploy `upsell-b` instead. Kept for backward-compatible invokes. */
import { handleUpsellRequest } from "../_shared/upsell-b.ts";

Deno.serve((req) => handleUpsellRequest(req, "check"));
