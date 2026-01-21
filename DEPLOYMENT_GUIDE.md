# Deployment Guide: Vercel + Render

This guide will help you deploy your app with:
- **Frontend** → Vercel (FREE)
- **Backend** → Render (FREE)

Total time: ~2 hours (first time)

---

## Prerequisites

- [x] Code pushed to GitHub
- [ ] Vercel account (sign up with GitHub)
- [ ] Render account (sign up with GitHub)
- [ ] GitHub token (optional but recommended)

---

## Part 1: Deploy Backend to Render (45 min)

### Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub
4. Authorize Render to access your repos

### Step 2: Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your `open-source-finder` repository
3. Click "Connect"

### Step 3: Configure Backend Settings

**Basic Settings:**
```
Name: oss-finder-backend (or whatever you want)
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: backend
```

**Build & Deploy:**
```
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm start
```

**Instance Type:**
```
Free (with limitations - sleeps after 15min inactivity)
```

### Step 4: Add Environment Variables

Click "Environment" tab and add:

```
PORT=3001
NODE_ENV=production
GITHUB_TOKEN=your_github_token_here
CORS_ORIGIN=https://your-frontend-url.vercel.app
```

**Note:** You'll update `CORS_ORIGIN` after deploying frontend

**Get GitHub Token:**
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "OSS Finder API"
4. No scopes needed (for public repos)
5. Click "Generate"
6. Copy token and paste in Render

### Step 5: Deploy!

1. Click "Create Web Service"
2. Wait ~5 minutes for build
3. You'll get a URL like: `https://oss-finder-backend.onrender.com`

### Step 6: Test Backend

Open in browser:
```
https://your-backend-url.onrender.com/api/repos/search?language=TypeScript
```

You should see JSON with repositories!

**✅ Backend is LIVE!**

---

## Part 2: Deploy Frontend to Vercel (30 min)

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Continue with GitHub
4. Authorize Vercel

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Find your `open-source-finder` repo
3. Click "Import"

### Step 3: Configure Frontend Settings

**Framework Preset:** Vite (should auto-detect)

**Root Directory:**
```
Click "Edit" → Type: frontend
```

**Build Settings:**
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 4: Add Environment Variable

Click "Environment Variables":

```
Name: VITE_API_URL
Value: https://your-backend-url.onrender.com
```

Replace with YOUR actual backend URL from Render!

### Step 5: Deploy!

1. Click "Deploy"
2. Wait ~2 minutes
3. You'll get a URL like: `https://oss-finder-abc123.vercel.app`

**✅ Frontend is LIVE!**

---

## Part 3: Connect Them (15 min)

### Update Backend CORS

1. Go back to Render dashboard
2. Click your backend service
3. Go to "Environment" tab
4. Update `CORS_ORIGIN`:
```
CORS_ORIGIN=https://your-actual-frontend.vercel.app
```
5. Click "Save Changes"
6. Service will auto-redeploy (~2 min)

### Test Everything

1. Open your Vercel URL: `https://your-frontend.vercel.app`
2. Try searching for "TypeScript" repos
3. Should work! 🎉

---

## Part 4: Custom Domain (Optional - 20 min)

### Frontend Domain (Vercel)

1. Go to your project settings
2. Click "Domains"
3. Add your domain (e.g., `ossfinder.com`)
4. Follow DNS instructions

### Backend Domain (Render)

1. Go to your service settings
2. Click "Custom Domains"
3. Add subdomain (e.g., `api.ossfinder.com`)
4. Update frontend env var to use new domain

---

## Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check logs in Render dashboard
- Verify environment variables are set
- Make sure `npm start` works locally

**"CORS error"**
- Double-check `CORS_ORIGIN` matches your Vercel URL exactly
- Include `https://` prefix
- No trailing slash

### Frontend Issues

**"Failed to fetch"**
- Check `VITE_API_URL` is set correctly
- Test backend URL directly in browser
- Check browser console for errors

**"Network error"**
- Backend might be sleeping (Render free tier)
- First request takes 30 seconds to wake up
- Subsequent requests are fast

---

## Cost Summary

| Service | Plan | Cost |
|---------|------|------|
| Vercel (Frontend) | Hobby | FREE |
| Render (Backend) | Free Tier | FREE |
| **Total** | | **$0/month** |

**Limitations:**
- Render free tier sleeps after 15min inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month server time

**Upgrade Options:**
- Render Starter: $7/month (no sleep)
- Vercel Pro: $20/month (if you need more)

---

## What You'll Have

✅ Live app at: `https://your-app.vercel.app`
✅ API at: `https://your-backend.onrender.com`
✅ Automatic deployments (push to GitHub = auto-deploy)
✅ HTTPS/SSL included (free)
✅ CDN for frontend (fast globally)

---

## Next Steps After Deployment

1. **Share it!**
   - Tweet the link
   - Post on LinkedIn
   - Share on dev.to
   - Add to your resume

2. **Add to README**
   - Live demo link
   - Screenshots

3. **Set up CI/CD** (tomorrow's task)
   - GitHub Actions
   - Auto-test before deploy

4. **Monitor usage**
   - Vercel Analytics
   - Render logs

---

## Future Improvements

- Add custom domain
- Set up monitoring/alerts
- Add caching (Redis)
- Upgrade to paid tier (if needed)
- Add database (Supabase)
- Implement rate limiting

---

## Questions?

Common questions:

**Q: Why does first request take 30 seconds?**
A: Render free tier puts server to sleep after 15min. Upgrade to $7/month to prevent sleep.

**Q: Can I deploy both on Vercel?**
A: Yes, but Vercel serverless functions are more expensive for backends.

**Q: Can I deploy both on Render?**
A: Yes, but Vercel is better optimized for frontend (faster CDN).

**Q: Will automatic deployments work?**
A: Yes! Push to `main` branch → both Vercel and Render auto-deploy.

**Q: How do I see logs?**
A: Vercel: Project → Deployments → Click deployment → Logs
Render: Dashboard → Service → Logs tab

---

**Ready to deploy? Let's do this!** 🚀
