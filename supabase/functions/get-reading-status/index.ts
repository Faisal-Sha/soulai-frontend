import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import Stripe from "npm:stripe@14.21.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return new Response(JSON.stringify({ error: "Missing sessionId" }), {
                status: 400,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SERVICE_ROLE_KEY") || "";
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        console.log(`[GetReadingStatus] Request for sessionId: ${sessionId}`);

        try {
            // 1. Get Stripe session to find customer email
            let stripeSession;
            try {
                stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
            } catch (stripeErr) {
                console.error(`[GetReadingStatus] Stripe Error: ${stripeErr.message}`);
                return new Response(JSON.stringify({ status: "error", reason: "stripe_session_not_found" }), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }

            const customerEmail = stripeSession.customer_details?.email || stripeSession.customer_email;

            if (!customerEmail) {
                console.error(`[GetReadingStatus] No email found in session ${sessionId}`);
                return new Response(JSON.stringify({ status: "not_found", reason: "no_email_in_session" }), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }

            console.log(`[GetReadingStatus] Found email: ${customerEmail}`);

            // 2. Find user by email
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("id")
                .eq("email", customerEmail)
                .maybeSingle();

            if (profileError) {
                console.error(`[GetReadingStatus] Profile Select Error: ${profileError.message}`);
            }

            let userId = profile?.id;

            // Fallback: Check auth.users if profile doesn't exist yet (webhook race condition)
            if (!userId) {
                console.log(`[GetReadingStatus] Profile not found for ${customerEmail}, checking auth.users...`);
                const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
                
                if (listError) {
                    console.error(`[GetReadingStatus] ListUsers Error: ${listError.message}`);
                }

                const authUser = users?.find(u => u.email === customerEmail);
                if (authUser) {
                    userId = authUser.id;
                    console.log(`[GetReadingStatus] Found user in auth.users: ${userId}. Creating profile...`);
                    
                    // On-the-fly profile creation to unblock the flow
                    const { error: insertError } = await supabase.from("profiles").insert({
                        id: userId,
                        email: customerEmail,
                    });
                    if (insertError) console.error(`[GetReadingStatus] Profile Insert Error: ${insertError.message}`);
                }
            }

            if (!userId) {
                console.log(`[GetReadingStatus] User still not found for ${customerEmail}`);
                return new Response(JSON.stringify({ status: "processing", reason: "user_not_created_yet" }), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }

            console.log(`[GetReadingStatus] Resolved userId: ${userId}`);

            // 3. Find reading by user_id
            let { data: reading, error: readingError } = await supabase
                .from("readings")
                .select("status, pdf_url")
                .eq("user_id", userId)
                .maybeSingle();

            if (readingError) {
                console.error(`[GetReadingStatus] Reading Select Error: ${readingError.message}`);
            }

            if (!reading) {
                console.log(`[GetReadingStatus] Reading missing for user ${userId}. Triggering generation...`);
                
                // Trigger generation if not found (resilience)
                const planType = stripeSession.metadata?.plan_type || "unknown";
                const leadId = stripeSession.metadata?.lead_id || null;
                
                const generateUrl = `${supabaseUrl}/functions/v1/generate-reading`;
                try {
                    const genResponse = await fetch(generateUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${supabaseServiceKey}`,
                        },
                        body: JSON.stringify({
                            userId: userId,
                            leadId: leadId,
                            planType: planType,
                        }),
                    });

                    if (!genResponse.ok) {
                        const errorText = await genResponse.text();
                        console.error(`[GetReadingStatus] Generate function failed: ${genResponse.status} ${errorText}`);
                    } else {
                        console.log(`[GetReadingStatus] Generate function triggered successfully`);
                        // Small delay to allow DB to propagate
                        await new Promise(resolve => setTimeout(resolve, 800));
                    }
                } catch (fetchErr) {
                    console.error(`[GetReadingStatus] Fetch error triggering generation: ${fetchErr.message}`);
                }

                // Re-fetch reading status after triggering
                const { data: newReading } = await supabase
                    .from("readings")
                    .select("status, pdf_url")
                    .eq("user_id", userId)
                    .maybeSingle();
                
                reading = newReading;
            }

            if (!reading) {
                console.log(`[GetReadingStatus] Reading still not found for user ${userId} after trigger`);
                return new Response(JSON.stringify({ status: "processing", reason: "reading_not_started_yet" }), {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                });
            }

            console.log(`[GetReadingStatus] Returning status: ${reading.status}, pdfReady: ${!!reading.pdf_url}`);

            return new Response(JSON.stringify({ 
                status: reading.status, 
                pdfReady: !!reading.pdf_url 
            }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });

        } catch (error) {
            console.error(`[GetReadingStatus] Inner Error: ${error.message}`);
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error(`[GetReadingStatus] Fatal Error: ${error.message}`);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
