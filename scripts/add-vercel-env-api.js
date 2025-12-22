// Script to add environment variables to Vercel using API
// This requires VERCEL_TOKEN environment variable

const https = require('https');

const projectId = 'prj_3cHPrF7RuFvQbK9P9sy9DiZq0QTQ';
const teamId = 'team_L4sjyTycHfQSHK6dj36Z0qep';

const envVars = [
  {
    key: 'DATABASE_URL',
    value: 'postgresql://neondb_owner:npg_v4uPVrC6TJqX@ep-restless-firefly-adgvs3gt-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    type: 'encrypted',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'BETTER_AUTH_SECRET',
    value: 'T6C3M9FYzox8TIyphZQ7EPK4p/1cRwHGRfOLIfnDQfs=',
    type: 'encrypted',
    target: ['production', 'preview', 'development']
  },
  {
    key: 'NEXT_PUBLIC_APP_URL',
    value: 'https://next-jam-2025-day1-7.vercel.app',
    type: 'plain',
    target: ['production', 'preview', 'development']
  }
];

const token = process.env.VERCEL_TOKEN;

if (!token) {
  console.log('❌ VERCEL_TOKEN environment variable not found.');
  console.log('\n📝 Please add environment variables manually:');
  console.log('   https://vercel.com/donia-batools-projects/next-jam-2025-day1-7/settings/environment-variables\n');
  console.log('Required variables:');
  envVars.forEach(env => {
    console.log(`\n   ${env.key}:`);
    console.log(`   Value: ${env.value}`);
    console.log(`   Type: ${env.type}`);
    console.log(`   Target: ${env.target.join(', ')}`);
  });
  process.exit(1);
}

const data = JSON.stringify(envVars);
const options = {
  hostname: 'api.vercel.com',
  port: 443,
  path: `/v10/projects/${projectId}/env?upsert=true&teamId=${teamId}`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('🔧 Adding environment variables to Vercel via API...\n');

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Environment variables added successfully!\n');
      const result = JSON.parse(responseData);
      result.forEach(env => {
        console.log(`   ✅ ${env.key} (${env.type})`);
      });
    } else {
      console.log(`❌ Error: ${res.statusCode}`);
      console.log('Response:', responseData);
      console.log('\n📝 Please add environment variables manually:');
      console.log('   https://vercel.com/donia-batools-projects/next-jam-2025-day1-7/settings/environment-variables');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request error:', error.message);
  console.log('\n📝 Please add environment variables manually:');
  console.log('   https://vercel.com/donia-batools-projects/next-jam-2025-day1-7/settings/environment-variables');
});

req.write(data);
req.end();

