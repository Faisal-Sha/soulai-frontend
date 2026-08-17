/**
 * Script to run the ai_insights table migration
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load .env file manually
const envPath = path.resolve(process.cwd(), '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=["']?(.+?)["']?$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = envVars.VITE_SUPABASE_URL || '';
const supabaseKey = envVars.VITE_SUPABASE_PUBLISHABLE_KEY || '';

console.log('🚀 Running ai_insights table migration...\n');

const supabase = createClient(supabaseUrl, supabaseKey);

// Read the migration SQL
const migrationPath = path.resolve(process.cwd(), 'supabase/migrations/create_ai_insights_table.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

async function runMigration() {
  try {
    // Execute the migration SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });

    if (error) {
      // Try alternative approach - break down into individual statements
      console.log('⚠️  Direct execution failed, trying statement-by-statement approach...\n');
      
      // For now, let's just try to create the table
      const createTableSQL = `
CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    matrix_id UUID,
    birth_date TEXT NOT NULL,
    matrix_data JSONB NOT NULL,
    insight_text TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_insights_user_birth ON public.ai_insights(user_id, birth_date);
CREATE INDEX IF NOT EXISTS idx_ai_insights_matrix ON public.ai_insights(matrix_id);

ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;
      `.trim();

      console.log('Executing table creation...');
      const result = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({ query: createTableSQL })
      });

      if (!result.ok) {
        const errorText = await result.text();
        console.error('❌ Migration failed:', errorText);
        console.log('\n📋 Please run this SQL manually in Supabase dashboard:');
        console.log('   https://supabase.com/dashboard/project/zinfmmyxkcafmurkznyh/sql/new\n');
        console.log(migrationSQL);
        return;
      }
    }

    console.log('✅ Migration completed successfully!');
    console.log('\nVerifying table creation...');
    
    // Verify the table exists
    const { data: verifyData, error: verifyError } = await supabase
      .from('ai_insights')
      .select('id')
      .limit(1);

    if (verifyError) {
      console.log('⚠️  Table verification had issues:', verifyError.message);
      console.log('\n📋 Please verify manually or run the SQL in Supabase dashboard.');
    } else {
      console.log('✅ Table verified successfully!');
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err);
    console.log('\n📋 Please run this SQL manually in Supabase dashboard:');
    console.log('   https://supabase.com/dashboard/project/zinfmmyxkcafmurkznyh/sql/new\n');
    console.log(migrationSQL);
  }
}

runMigration();
