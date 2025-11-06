# TechKlein VoteLive - Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Supabase account ([supabase.com](https://supabase.com))
- Vercel account ([vercel.com](https://vercel.com))
- Domain name (optional but recommended)
- Git repository (GitHub/GitLab/Bitbucket)

---

## 🗄️ Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Choose organization and project name: `techklein-votelive`
4. Select region: **US East (N. Virginia)** (closest to Haiti)
5. Generate strong database password (save it securely!)
6. Wait for project to provision (~2-3 minutes)

### 1.2 Get API Credentials

From Supabase Dashboard → **Settings** → **API**:

- **Project URL**: `https://your-project.supabase.co`
  - Save as: `NEXT_PUBLIC_SUPABASE_URL`
- **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - Save as: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
  - Save as: `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **KEEP SECRET!**

### 1.3 Run Database Schema

1. Go to **SQL Editor** in Supabase Dashboard
2. Create new query
3. Copy entire contents of `supabase/schema.sql`
4. Paste and click **"Run"**
5. Verify tables created in **Table Editor**:
   - `candidates`
   - `candidate_meta`
   - `votes`
   - `otp_codes`
   - `fraud_logs`
   - `vote_aggregates` (materialized view)
   - `vote_by_country` (view)

### 1.4 Configure Storage

1. Go to **Storage** in Supabase Dashboard
2. Click **"Create bucket"**
3. Bucket name: `candidate-photos`
4. Make it **Public**
5. Configure CORS:
   ```json
   {
     "allowedOrigins": ["*"],
     "allowedMethods": ["GET", "HEAD"],
     "allowedHeaders": ["*"],
     "maxAge": 86400
   }
   ```

### 1.5 Setup Row Level Security (RLS)

1. Go to **SQL Editor**
2. Run the policies from `supabase/policies.sql`
3. Verify RLS is enabled on all tables

### 1.6 Upload Candidate Photos

1. Prepare photos:
   - Format: JPG or PNG
   - Size: 800x800px recommended
   - Max: 2MB each
   - Name: `candidate-slug.jpg`

2. Upload via **Storage** → `candidate-photos` → **Upload**

3. Get public URLs (format):
   ```
   https://your-project.supabase.co/storage/v1/object/public/candidate-photos/candidate-slug.jpg
   ```

### 1.7 Seed Candidates Data

1. Update `supabase/seed.sql` with actual data
2. Run in **SQL Editor**
3. Verify candidates in **Table Editor**

---

## 💻 Step 2: Local Development

### 2.1 Clone Repository

```bash
git clone https://github.com/your-org/techklein-votelive.git
cd techklein-votelive
```

### 2.2 Install Dependencies

```bash
pnpm install
```

### 2.3 Environment Variables

Create `.env.local` in project root:

```env
# Public (safe to expose)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Private (NEVER commit these!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2a$10$... # Generate below
JWT_SECRET=your-random-secret-at-least-32-characters-long
```

⚠️ **Add `.env.local` to `.gitignore`!**

### 2.4 Generate Admin Password Hash

```bash
node -e "console.log(require('bcryptjs').hashSync('YourSecurePassword123!', 10))"
```

Copy the output hash to `ADMIN_PASSWORD_HASH` in `.env.local`

### 2.5 Generate JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy to `JWT_SECRET` in `.env.local`

### 2.6 Test Locally

```bash
pnpm dev
```

Visit: http://localhost:3000

**Test checklist:**
- [ ] Homepage loads
- [ ] Candidate grid displays
- [ ] Search works
- [ ] Vote flow (select → form → OTP → success)
- [ ] Live dashboard updates
- [ ] Admin login (`/admin/login`)
- [ ] All 4 languages work

---

## 🚀 Step 3: Vercel Deployment

### 3.1 Push to Git

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 3.2 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"**
3. Import your Git repository
4. Select framework: **Next.js** (auto-detected)
5. **DO NOT deploy yet** - configure environment variables first

### 3.3 Configure Environment Variables

In Vercel Dashboard → **Settings** → **Environment Variables**:

**Add for Production, Preview, and Development:**

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `https://votelive.techklein.com` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://votelive-preview.vercel.app` | Preview |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | All |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbG...` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbG...` ⚠️ | All (Sensitive) |
| `ADMIN_USERNAME` | `admin` | All (Sensitive) |
| `ADMIN_PASSWORD_HASH` | `$2a$10$...` | All (Sensitive) |
| `JWT_SECRET` | `your-64-char-hex` | All (Sensitive) |

⚠️ Mark sensitive variables as **Sensitive** in Vercel!

### 3.4 Deploy

```bash
git push origin main
```

Vercel will auto-deploy. Monitor at:
- Vercel Dashboard → **Deployments**
- Build logs for errors

### 3.5 Custom Domain (Optional)

1. Vercel Dashboard → **Settings** → **Domains**
2. Click **"Add"**
3. Enter: `votelive.techklein.com`
4. Update DNS records as instructed:
   ```
   Type: CNAME
   Name: votelive
   Value: cname.vercel-dns.com
   ```
5. Wait for SSL certificate (automatic, ~5 minutes)

### 3.6 Update Supabase URLs

In Supabase Dashboard → **Authentication** → **URL Configuration**:

- **Site URL**: `https://votelive.techklein.com`
- **Redirect URLs**: `https://votelive.techklein.com/*`

---

## ✅ Step 4: Post-Deployment Verification

### 4.1 Functional Testing

Test on production URL:

- [ ] Homepage loads correctly
- [ ] All candidate photos display
- [ ] Search functionality works
- [ ] Vote submission works
- [ ] OTP code received (check phone)
- [ ] Vote counted in database
- [ ] Live dashboard updates in real-time
- [ ] Admin login works (`/admin/login`)
- [ ] Admin dashboard accessible
- [ ] Fraud detection page works
- [ ] CSV export downloads
- [ ] Embed widget works (`/embed`)
- [ ] TV overlay works (`/overlay`)
- [ ] QR code generator works
- [ ] All 4 languages switch correctly
- [ ] Mobile responsive design works

### 4.2 Performance Testing

Run **Lighthouse** audit (Chrome DevTools):

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

Check **Core Web Vitals**:
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### 4.3 Mobile Testing

Test on real devices:
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad/Android)

Check:
- [ ] Touch targets are 44x44px minimum
- [ ] No horizontal scroll
- [ ] Safe area insets work on notched devices
- [ ] Virtual keyboard doesn't break layout
- [ ] All buttons clickable

### 4.4 Security Audit

- [ ] Service role key not exposed in client
- [ ] RLS policies active on all tables
- [ ] Rate limiting works (test rapid requests)
- [ ] CORS configured correctly
- [ ] HTTPS enforced (no HTTP access)
- [ ] Security headers present (check Network tab)
- [ ] No console errors in production
- [ ] Admin routes require authentication

### 4.5 Database Health

In Supabase Dashboard:

1. **Database** → **Replication**: Check lag
2. **Database** → **Roles**: Verify permissions
3. **Table Editor**: Check data integrity
4. **Storage**: Verify all images accessible

---

## 📊 Step 5: Monitoring & Maintenance

### 5.1 Setup Monitoring

**Vercel Analytics** (free):
- Already enabled by default
- View in Vercel Dashboard → **Analytics**

**Supabase Monitoring**:
- Dashboard → **Database** → **Query Performance**
- Dashboard → **Auth** → **Users** (if using auth)
- Dashboard → **Storage** → **Usage**

**Error Tracking** (optional):
- Integrate Sentry: https://sentry.io
- Add to `next.config.ts`

### 5.2 Setup Alerts

**Vercel Integrations**:
1. Dashboard → **Settings** → **Integrations**
2. Add Slack/Discord webhook
3. Configure alerts for:
   - Deployment failures
   - Build errors
   - High error rates

**Supabase Alerts**:
1. Dashboard → **Settings** → **Webhooks**
2. Configure for:
   - Database errors
   - High CPU usage
   - Storage limits

### 5.3 Maintenance Schedule

**Daily:**
- Monitor Vercel dashboard for errors
- Check Supabase logs
- Review fraud detection alerts

**Weekly:**
- Refresh materialized views:
  ```sql
  REFRESH MATERIALIZED VIEW CONCURRENTLY vote_aggregates;
  ```
- Export vote data backup (CSV)
- Review performance metrics

**Monthly:**
- Update dependencies:
  ```bash
  pnpm update
  ```
- Security audit
- Performance optimization
- Review storage usage

### 5.4 Backup Strategy

**Database Backups** (Supabase Pro required):
- Automatic daily backups
- Point-in-time recovery (PITR)

**Manual Backups**:
1. Go to **Database** → **Backups**
2. Click **"Create backup"**
3. Download to secure location

**Code Backups**:
- Git repository (already backed up)
- Vercel keeps deployment history

---

## 🔧 Troubleshooting

### Build Fails on Vercel

**Issue**: TypeScript errors during build

**Solution**:
```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs
```

### Database Connection Issues

**Issue**: "Failed to connect to Supabase"

**Solutions**:
1. Verify environment variables in Vercel
2. Check Supabase project is active
3. Verify service role key is correct
4. Check RLS policies aren't blocking queries

### Images Not Loading

**Issue**: Candidate photos return 404

**Solutions**:
1. Verify storage bucket is **Public**
2. Check CORS policy configured
3. Confirm image URLs in database match storage
4. Check `next.config.ts` image domains

### OTP Not Sending

**Issue**: Users don't receive verification code

**Solutions**:
1. Verify phone format: `+509...` (Haiti)
2. Check Supabase logs for errors
3. Implement Twilio integration (Phase 9)
4. Test with different phone numbers

### Admin Login Fails

**Issue**: "Invalid credentials"

**Solutions**:
1. Verify `ADMIN_USERNAME` in Vercel
2. Check `ADMIN_PASSWORD_HASH` is correct
3. Regenerate password hash:
   ```bash
   node -e "console.log(require('bcryptjs').hashSync('password', 10))"
   ```
4. Update environment variable in Vercel
5. Redeploy

### High Response Times

**Issue**: Pages loading slowly

**Solutions**:
1. Check Supabase region (use US East)
2. Refresh materialized views
3. Add database indexes:
   ```sql
   CREATE INDEX idx_votes_candidate ON votes(candidate_id);
   CREATE INDEX idx_votes_country ON votes(country);
   ```
4. Enable edge caching in Vercel

---

## 📱 Step 6: Launch Checklist

### Pre-Launch (T-7 days)

- [ ] All features tested on staging
- [ ] Database fully seeded with candidates
- [ ] All candidate photos uploaded
- [ ] Admin credentials secured
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Performance targets met
- [ ] Security audit passed
- [ ] Mobile testing complete
- [ ] Multi-language testing complete

### Launch Day (T-0)

- [ ] Final database backup
- [ ] Verify production environment variables
- [ ] Deploy to production
- [ ] Smoke test all critical paths
- [ ] Monitor error rates (first hour)
- [ ] Announce launch on social media
- [ ] Monitor traffic spikes
- [ ] Be ready for rapid scaling

### Post-Launch (T+24h)

- [ ] Review first 24h metrics
- [ ] Check for any fraud patterns
- [ ] Export first day vote data
- [ ] Address any reported issues
- [ ] Thank early users
- [ ] Plan for phase 2 improvements

---

## 🆘 Support Contacts

**Technical Issues:**
- Supabase: https://supabase.com/support
- Vercel: https://vercel.com/support
- Next.js: https://github.com/vercel/next.js/discussions

**TechKlein Team:**
- Email: support@techklein.com
- Phone: +509 XXXX XXXX
- Slack: #votelive-support

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🎉 Congratulations!

**TechKlein VoteLive is now live!** 🚀

Your production-ready voting platform is deployed and ready to serve the Haitian diaspora worldwide.

**Platform Features:**
- ✅ Real-time voting with fraud detection
- ✅ OTP verification
- ✅ Live dashboard with analytics
- ✅ Admin panel with export
- ✅ Multi-language support (4 languages)
- ✅ Media tools (embed, overlay, QR codes)
- ✅ Shareable vote cards
- ✅ Candidate profiles
- ✅ Geographic analytics
- ✅ Mobile-optimized
- ✅ Production-grade security

**Next Steps:**
1. Monitor platform during launch week
2. Gather user feedback
3. Plan Phase 9: Advanced Features
   - SMS integration (Twilio)
   - Advanced analytics
   - Email notifications
   - Social media integration

---

**Built with ❤️ by TechKlein**

*Empowering democracy through technology*
