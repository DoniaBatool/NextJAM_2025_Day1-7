# Vercel Environment Variables Setup Guide

## 🔧 Environment Variables Add Karne Ke Liye

### Step 1: Vercel Dashboard Par Jao
Link: https://vercel.com/donia-batools-projects/next-jam-2025-day1-7/settings/environment-variables

### Step 2: Neeche Diye Gaye 3 Variables Add Karo

#### 1. DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** `postgresql://neondb_owner:npg_v4uPVrC6TJqX@ep-restless-firefly-adgvs3gt-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- **Type:** Encrypted (Secret) ✅
- **Environment:** Production, Preview, Development (sab select karo) ✅

#### 2. BETTER_AUTH_SECRET
- **Key:** `BETTER_AUTH_SECRET`
- **Value:** `T6C3M9FYzox8TIyphZQ7EPK4p/1cRwHGRfOLIfnDQfs=`
- **Type:** Encrypted (Secret) ✅
- **Environment:** Production, Preview, Development (sab select karo) ✅

#### 3. NEXT_PUBLIC_APP_URL
- **Key:** `NEXT_PUBLIC_APP_URL`
- **Value:** `https://next-jam-2025-day1-7.vercel.app`
- **Type:** Plain ✅
- **Environment:** Production, Preview, Development (sab select karo) ✅

### Step 3: Save Karo Aur Redeploy

Variables add karne ke baad:
1. "Save" button click karo
2. Production deployment ko redeploy karo

---

## ✅ Quick Copy-Paste Values

```
DATABASE_URL=postgresql://neondb_owner:npg_v4uPVrC6TJqX@ep-restless-firefly-adgvs3gt-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

BETTER_AUTH_SECRET=T6C3M9FYzox8TIyphZQ7EPK4p/1cRwHGRfOLIfnDQfs=

NEXT_PUBLIC_APP_URL=https://next-jam-2025-day1-7.vercel.app
```

---

## 📝 Notes

- **DATABASE_URL** aur **BETTER_AUTH_SECRET** ko **Encrypted** type mein add karna hai (security ke liye)
- **NEXT_PUBLIC_APP_URL** ko **Plain** type mein add karna hai
- Sabhi environments (Production, Preview, Development) mein add karo
- Variables add karne ke baad redeploy zaroori hai

