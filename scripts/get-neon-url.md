# How to Get Neon Database Connection String

## Quick Steps:

1. **Go to Neon Dashboard:**
   - Visit: https://neon.tech
   - Sign up or login

2. **Create Project (if new):**
   - Click "New Project"
   - Choose a name and region
   - Click "Create Project"

3. **Get Connection String:**
   - After creating project, you'll see the dashboard
   - Look for "Connection Details" or "Connection String" section
   - Copy the connection string (it looks like):
     ```
     postgresql://username:password@ep-xxxx-xxxx.region.aws.neon.tech/dbname?sslmode=require
     ```

4. **Update .env.local:**
   - Open `.env.local` file
   - Replace the `DATABASE_URL` line with the copied connection string
   - Make sure to keep the quotes: `DATABASE_URL="postgresql://..."`

5. **Run Database Setup:**
   ```bash
   npm run db:push
   ```

## Alternative: Copy from Dashboard

1. Go to your Neon project dashboard
2. Click on "Connection Details" tab
3. You'll see multiple connection strings:
   - Choose the one that says "Connection string" or "URI"
   - It should include `?sslmode=require` at the end
4. Copy and paste into `.env.local`

## Tips:

- ✅ Connection string already includes SSL (`sslmode=require`)
- ✅ Username and password are already included
- ✅ No need to modify anything, just copy-paste

