/**
 * Script to check if ai_insights table exists in Supabase
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

console.log(`Connecting to: ${supabaseUrl}`);
console.log(`Key available: ${supabaseKey ? 'Yes' : 'No'}\n`);

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
  console.log('Checking if ai_insights table exists...\n');

  try {
    const { data, error } = await supabase
      .from('ai_insights')
      .select('id')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        console.error('❌ Table does not exist!');
        console.error('Error:', error.message);
        console.log('\n📋 You need to run the migration in Supabase:');
        console.log('   1. Go to https://supabase.com/dashboard/project/zinfmmyxkcafmurkznyh/editor');
        console.log('   2. Click "SQL Editor" in the left menu');
        console.log('   3. Click "New query"');
        console.log('   4. Copy the contents of: supabase/migrations/create_ai_insights_table.sql');
        console.log('   5. Paste and click "Run"\n');
      } else {
        console.error('❌ Error checking table:', error);
      }
      return false;
    }

    console.log('✅ Table exists!');
    console.log(`   Found ${data?.length || 0} rows`);
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

checkTable();
