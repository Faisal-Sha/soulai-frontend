import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const MIXPANEL_API_SECRET = Deno.env.get('MIXPANEL_API_SECRET')
        const MIXPANEL_PROJECT_ID = Deno.env.get('MIXPANEL_PROJECT_ID')
        const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
        const SERVICE_ROLE_KEY = Deno.env.get('SERVICE_ROLE_KEY')

        if (!MIXPANEL_API_SECRET || !MIXPANEL_PROJECT_ID || !SUPABASE_URL || !SERVICE_ROLE_KEY) {
            throw new Error('Missing environment variables')
        }

        const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

        // Helper to fetch from Mixpanel JQL or Insights API
        // We will use JQL for flexibility or specialized Insights endpoints
        // For now, let's stick to simple Insights queries for "New Users" and "Active Users"

        // 1. Get Date Range (Today)
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];

        // 2. Fetch Daily Active Users (DAU) - Unique 'Page View' or any events
        // Mixpanel API: https://developer.mixpanel.com/reference/insights
        // We can use JQL for "Any Event" count by distinct_id

        // Simplification: We will simulate the fetch logic structure first.
        // Real implementation requires precise Mixpanel Query Language (JQL) or Segmentation API calls.
        // For this MVP, let's fetch "Total Events" as a proxy or specific event counts if possible.

        // Let's use Mixpanel Segmentation API for simpler fetching
        // https://mixpanel.com/api/2.0/segmentation

        const fetchMixpanelData = async (event: string, type: 'unique' | 'total', from_date: string, to_date: string) => {
            const params = new URLSearchParams({
                from_date,
                to_date,
                event,
                type
            });
            const url = `https://mixpanel.com/api/2.0/segmentation?${params.toString()}`;
            // Basic Auth with API Secret
            const auth = btoa(MIXPANEL_API_SECRET + ':');

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Basic ${auth}`
                }
            });

            if (!response.ok) {
                const text = await response.text();
                console.error(`Mixpanel Error for ${event}:`, text);
                return 0;
            }

            const data = await response.json();
            // Parse data.data.values -> returns object { "2024-01-14": 123 }
            const values = data.data?.values?.[event] || {};
            return values[to_date] || 0;
        }

        // Since we are running this "now", let's get data for TODAY so far
        const activeUsers = await fetchMixpanelData('Page View', 'unique', dateString, dateString);
        const newUsers = await fetchMixpanelData('User Signup', 'unique', dateString, dateString);

        // Get total users (Need JQL or People API usually, but let's approximate or skip for now)
        // For Total Users, we might skip updates or use a separate "engage" query.
        // Let's settle for active/new for daily.

        // Get Top Pages (Segmentation on "Page View" by "page_name" property)
        // https://mixpanel.com/api/2.0/segmentation/multiseg?event=Page View&name=page_name ...
        // Complex query. For now, let's store simpler stats.

        const stats = {
            date: dateString,
            new_users: newUsers,
            active_users: activeUsers,
            // For total users, maybe fetch from Supabase auth?
            // total_users: ... 
        }

        // Upsert into Supabase
        const { error } = await supabase.from('analytics_daily_stats').upsert(stats);

        if (error) throw error;

        return new Response(JSON.stringify({ success: true, stats }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        console.error('Error:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
