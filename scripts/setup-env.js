const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const secret = 'T6C3M9FYzox8TIyphZQ7EPK4p/1cRwHGRfOLIfnDQfs=';

let existingContent = '';
if (fs.existsSync(envPath)) {
  existingContent = fs.readFileSync(envPath, 'utf8');
}

// Check if variables already exist
const hasBetterAuthSecret = existingContent.includes('BETTER_AUTH_SECRET');
const hasDatabaseUrl = existingContent.includes('DATABASE_URL=');
const hasAppUrl = existingContent.includes('NEXT_PUBLIC_APP_URL=');

let newContent = existingContent;

if (!hasBetterAuthSecret) {
  newContent += `\n# BetterAuth Configuration\nBETTER_AUTH_SECRET=${secret}\n`;
}

if (!hasAppUrl) {
  newContent += `NEXT_PUBLIC_APP_URL=https://next-jam-2025-day1-7.vercel.app\n`;
}

if (!hasDatabaseUrl) {
  newContent += `\n# Database URL - Get from Neon Dashboard (https://neon.tech)\n`;
  newContent += `# Copy connection string from Neon project dashboard\n`;
  newContent += `# Format: postgresql://username:password@ep-xxxx-xxxx.region.aws.neon.tech/dbname?sslmode=require\n`;
  newContent += `DATABASE_URL=postgresql://username:password@ep-xxxx-xxxx.region.aws.neon.tech/dbname?sslmode=require\n`;
}

fs.writeFileSync(envPath, newContent);
console.log('✅ .env.local file updated!');
console.log('\n⚠️  IMPORTANT: Update DATABASE_URL with your Neon database connection string');
console.log('   Go to: https://neon.tech and copy connection string from your project');

