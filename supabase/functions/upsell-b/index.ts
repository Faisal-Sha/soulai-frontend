import { handleUpsellRequest } from "../_shared/upsell-b.ts";

Deno.serve((req) => handleUpsellRequest(req));
