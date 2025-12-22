const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env.local');
const neonString = 'postgresql://neondb_owner:npg_v4uPVrC6TJqX@ep-restless-firefly-adgvs3gt-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

let content = '';
if (fs.existsSync(envPath)) {
  content = fs.readFileSync(envPath, 'utf8');
}

// Replace DATABASE_URL if exists, otherwise add it
if (content.includes('DATABASE_URL=')) {
  content = content.replace(/DATABASE_URL=.*/g, `DATABASE_URL="${neonString}"`);
} else {
  content += `\nDATABASE_URL="${neonString}"\n`;
}

fs.writeFileSync(envPath, content);
console.log('✅ DATABASE_URL updated with your Neon connection string!');
console.log('\nNext step: Run "npm run db:push" to create BetterAuth tables');

