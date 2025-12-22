const { execSync } = require('child_process');

const envVars = {
  'DATABASE_URL': 'postgresql://neondb_owner:npg_v4uPVrC6TJqX@ep-restless-firefly-adgvs3gt-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  'BETTER_AUTH_SECRET': 'T6C3M9FYzox8TIyphZQ7EPK4p/1cRwHGRfOLIfnDQfs=',
  'NEXT_PUBLIC_APP_URL': 'https://next-jam-2025-day1-7.vercel.app'
};

console.log('🔧 Adding environment variables to Vercel...\n');

for (const [key, value] of Object.entries(envVars)) {
  try {
    console.log(`Adding ${key}...`);
    // Use echo to pipe value to vercel env add
    const command = `echo ${JSON.stringify(value)} | npx vercel env add ${key} production --yes`;
    execSync(command, { stdio: 'inherit', shell: true });
    console.log(`✅ ${key} added successfully\n`);
  } catch (error) {
    console.error(`❌ Error adding ${key}:`, error.message);
    // Try alternative method
    try {
      const altCommand = `npx vercel env add ${key} production --yes < echo ${JSON.stringify(value)}`;
      execSync(altCommand, { stdio: 'inherit', shell: true });
      console.log(`✅ ${key} added successfully (alternative method)\n`);
    } catch (altError) {
      console.error(`❌ Failed to add ${key}. Please add manually via Vercel dashboard.\n`);
    }
  }
}

console.log('✅ Environment variables setup complete!');
console.log('\n⚠️  If any variables failed, add them manually at:');
console.log('   https://vercel.com/donia-batools-projects/next-jam-2025-day1-7/settings/environment-variables');

