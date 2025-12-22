// Verify BetterAuth Setup
const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying BetterAuth Setup...\n');

// Check .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');

// Check required variables
const checks = {
  'BETTER_AUTH_SECRET': envContent.includes('BETTER_AUTH_SECRET=') && !envContent.includes('BETTER_AUTH_SECRET=change-this'),
  'NEXT_PUBLIC_APP_URL': envContent.includes('NEXT_PUBLIC_APP_URL='),
  'DATABASE_URL': envContent.includes('DATABASE_URL=') && !envContent.includes('ep-xxxx-xxxx') && envContent.includes('neon.tech'),
};

console.log('Environment Variables:');
Object.entries(checks).forEach(([key, passed]) => {
  console.log(`  ${passed ? '✅' : '❌'} ${key}`);
  if (!passed && key === 'DATABASE_URL') {
    console.log('     ⚠️  Update DATABASE_URL with your Neon connection string');
    console.log('        Get it from: https://neon.tech (Dashboard > Connection Details)');
  }
});

// Check Prisma client
const prismaClientPath = path.join(process.cwd(), 'node_modules', '.prisma', 'client', 'index.js');
if (fs.existsSync(prismaClientPath)) {
  console.log('\n✅ Prisma client generated');
} else {
  console.log('\n❌ Prisma client not found. Run: npm run db:generate');
}

// Check BetterAuth files
const authFiles = [
  'src/lib/auth.ts',
  'src/lib/auth-client.ts',
  'src/lib/prisma.ts',
  'src/app/api/auth/[...all]/route.ts',
  'prisma/schema.prisma',
];

console.log('\nBetterAuth Files:');
authFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - Missing!`);
  }
});

// Summary
const allPassed = Object.values(checks).every(v => v) && fs.existsSync(prismaClientPath);
console.log('\n' + '='.repeat(50));
if (allPassed) {
  console.log('✅ Setup looks good!');
  console.log('\nNext steps:');
  console.log('  1. Run: npm run db:push');
  console.log('  2. Add environment variables to Vercel');
  console.log('  3. Redeploy on Vercel');
} else {
  console.log('⚠️  Some setup steps are incomplete.');
  console.log('\nSee SETUP_COMPLETE.md for detailed instructions.');
}

