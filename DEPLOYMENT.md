# 🚀 Deployment Guide

## Quick Deploy

### Backend → Railway
1. Sign up at railway.app
2. New Project → Deploy from GitHub
3. Add PostgreSQL database
4. Set environment variables (see below)
5. Run migrations: npm run migrate && npm run seed

### Frontend → Vercel  
1. Sign up at vercel.com
2. Import GitHub repo → Root: frontend/
3. Set NEXT_PUBLIC_API_URL
4. Deploy!

### Stripe Webhook
- Dashboard → Webhooks → Add endpoint
- URL: https://your-backend/api/stripe/webhook
- Events: checkout.session.completed, invoice.payment_succeeded
- Copy webhook secret to env

## Environment Variables

### Backend (Railway)
```
DATABASE_URL=(auto-filled)
JWT_SECRET=(generate 32+ chars)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

## GitHub Secrets (for auto-deploy)
- RAILWAY_TOKEN
- VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

## Cost
- Railway: $5/month credit (free tier)
- Vercel: Free for hobby
- Total: ~$0-5/month initially

🎉 Done! Push to main → Auto-deploys
