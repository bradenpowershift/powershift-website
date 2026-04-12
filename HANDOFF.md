# Powershift Energy Co — Handoff Checklist

Everything below requires manual action from you. Steps are in priority order. Total time: ~30 minutes of active work (plus DNS propagation wait).

---

## 1. Create GitHub Repository & Push Code

**Time:** 5 minutes
**Where:** github.com

1. Go to https://github.com/new
2. Repository name: `powershift-website`
3. Set to **Public**
4. Do NOT initialise with README (we already have one)
5. Click **Create repository**
6. Open Terminal in the `powershift-website` folder and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/powershift-website.git
git branch -M main
git push -u origin main
```

If you're not logged into GitHub CLI, you'll be prompted to authenticate. Follow the prompts or run `gh auth login` first.

**Expected result:** All files visible at `github.com/YOUR_USERNAME/powershift-website`

---

## 2. Deploy to Netlify

**Time:** 5 minutes
**Where:** app.netlify.com

### Option A: Via Netlify CLI (if installed)

```bash
npm install -g netlify-cli
netlify login
netlify init
# Choose "Connect to an existing GitHub repository"
# Select powershift-website
# Build command: (leave blank — it's static)
# Publish directory: . (just a dot)
netlify deploy --prod
```

### Option B: Via Netlify Web UI

1. Go to https://app.netlify.com
2. Sign up / log in (use GitHub login for easiest setup)
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **GitHub** → Authorise Netlify if prompted
5. Select the `powershift-website` repository
6. Build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `.`
7. Click **"Deploy site"**
8. Wait 30–60 seconds for the deploy to complete

**Expected result:** Your site is live at a URL like `random-name-123.netlify.app`. Test all 5 pages.

### Set your custom subdomain (optional but nice)

1. On the Netlify site dashboard, go to **Site settings** → **General** → **Site details**
2. Click **"Change site name"**
3. Set it to `powershift-energy` (or similar)
4. Your site is now at `powershift-energy.netlify.app`

---

## 3. Point DNS to Netlify (VentraIP)

**Time:** 10 minutes active, 24–48 hours propagation
**Where:** VentraIP control panel + Netlify dashboard

### Step 3a: Add custom domain in Netlify

1. In Netlify, go to your site dashboard → **Domain management** → **Add a domain**
2. Enter: `powershiftenergy.com.au`
3. Netlify will show you the DNS records needed

### Step 3b: Configure DNS in VentraIP

**Option A: Change Nameservers (recommended — simplest)**

1. Log in to https://ventraip.com.au/my-account/
2. Go to **My Domains** → click **powershiftenergy.com.au**
3. Find **Nameservers** section
4. Change nameservers to Netlify's:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
   - `dns3.p01.nsone.net`
   - `dns4.p01.nsone.net`
5. Save changes

**Option B: Add DNS Records (if you want to keep VentraIP nameservers)**

1. Log in to VentraIP → **My Domains** → **powershiftenergy.com.au** → **DNS Settings**
2. Add an **A record**:
   - Host: `@`
   - Points to: `75.2.60.5` (Netlify's load balancer — verify this in your Netlify dashboard under Domain management)
3. Add a **CNAME record**:
   - Host: `www`
   - Points to: `YOUR-SITE-NAME.netlify.app` (your Netlify subdomain)
4. Save changes

**Expected result:** After 24–48 hours, `powershiftenergy.com.au` loads your Netlify site.

### Step 3c: Enable HTTPS in Netlify

1. Wait for DNS to propagate (check with https://dnschecker.org/#A/powershiftenergy.com.au)
2. In Netlify dashboard → **Domain management** → **HTTPS**
3. Click **"Verify DNS configuration"**
4. Click **"Provision certificate"** (Netlify uses Let's Encrypt — it's automatic and free)
5. Wait 1–2 minutes for the certificate to generate

**Expected result:** `https://powershiftenergy.com.au` works with a valid SSL certificate (padlock icon).

---

## 4. Verify Formspree Forms

**Time:** 2 minutes
**Where:** Your email inbox (braden@powershiftenergy.com.au)

1. Go to your live site and submit a test entry on **each** form:
   - Solar form (solar.html)
   - Battery form (battery.html)
   - EV Charger form (ev-charger.html)
   - Electrician partner form (electricians.html)
2. Formspree will send a **verification email** to braden@powershiftenergy.com.au for each form endpoint
3. Open each email and click the **"Confirm form"** link
4. After confirmation, test again — the submission should go through and appear in your Formspree dashboard

**Formspree endpoints:**
- Solar: `https://formspree.io/f/xyklgzqn`
- Battery: `https://formspree.io/f/xvzdpgje`
- EV Charger: `https://formspree.io/f/mbdqrlnl`
- Electrician: `https://formspree.io/f/mjgjbkny`

**Expected result:** Each form submits successfully and you see entries in the Formspree dashboard.

---

## 5. Post-Launch Checks

Once the site is live on the custom domain:

- [ ] All 5 pages load at powershiftenergy.com.au
- [ ] HTTPS padlock shows on all pages
- [ ] All 4 forms submit successfully
- [ ] Phone number (0427 430 088) is clickable on mobile
- [ ] Site looks good on mobile (test on your phone)
- [ ] FAQ accordions open and close on all service pages
- [ ] All internal links work (nav, footer, CTAs)

---

## Summary

| Step | Action | Time | Status |
|------|--------|------|--------|
| 1 | Push to GitHub | 5 min | ☐ |
| 2 | Deploy on Netlify | 5 min | ☐ |
| 3 | Point DNS in VentraIP | 10 min + 24-48hr wait | ☐ |
| 4 | Verify Formspree emails | 2 min | ☐ |
| 5 | Post-launch checks | 5 min | ☐ |
