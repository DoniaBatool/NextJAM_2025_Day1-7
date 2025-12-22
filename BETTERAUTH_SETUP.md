# BetterAuth Setup Guide

## Step 1: Install Dependencies

Run this command in your terminal:

```bash
npm install better-auth @better-auth/prisma prisma @prisma/client
```

## Step 2: Get Supabase Database Connection String

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** > **Database**
4. Scroll down to **Connection string**
5. Select **URI** tab
6. Copy the connection string (it looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`)

## Step 3: Add Environment Variables

Add these to your `.env.local` file:

```env
# Database (Supabase Postgres)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# BetterAuth Secret (generate a random 32+ character string)
BETTER_AUTH_SECRET="your-random-secret-key-minimum-32-characters-long"

# App URL
NEXT_PUBLIC_APP_URL="https://next-jam-2025-day1-7.vercel.app"
# For local development, use: http://localhost:3000
```

**To generate a secure secret:**
```bash
# On Linux/Mac:
openssl rand -base64 32

# Or use an online generator:
# https://generate-secret.vercel.app/32
```

## Step 4: Generate Prisma Client

Run this command:

```bash
npm run db:generate
```

## Step 5: Push Database Schema

This will create the required tables in your Supabase database:

```bash
npm run db:push
```

## Step 6: Add Environment Variables to Vercel

1. Go to Vercel Dashboard: https://vercel.com/donia-batools-projects/next-jam-2025-day1-7
2. Go to **Settings** > **Environment Variables**
3. Add these variables:
   - `DATABASE_URL` (your Supabase Postgres connection string)
   - `BETTER_AUTH_SECRET` (same secret as local)
   - `NEXT_PUBLIC_APP_URL` = `https://next-jam-2025-day1-7.vercel.app`

## Step 7: Test

1. Start your dev server: `npm run dev`
2. Go to `/auth` page
3. Try signing up with email/password
4. Try logging in

## Important Notes

- **Google OAuth has been removed** as requested
- BetterAuth uses your existing Supabase Postgres database
- No need to configure Google OAuth anymore
- Email/password authentication is enabled
- Email verification is currently disabled (can be enabled later)

## Troubleshooting

If you get database connection errors:
1. Check your `DATABASE_URL` is correct
2. Make sure your Supabase database is accessible
3. Verify the password in the connection string is correct

If Prisma client errors:
1. Run `npm run db:generate` again
2. Make sure `@prisma/client` is installed

