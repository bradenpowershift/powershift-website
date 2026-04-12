# How to Get powershiftenergy.com.au Live

**Total active time:** ~30 minutes
**Total wait time:** 24–48 hours (DNS propagation — nothing you can do to speed this up)

There are 5 steps. Do them in order. Each one depends on the one before it.

---

## Step 1: Push the Code to GitHub

**Time:** 5 minutes

You need the website files hosted on GitHub so Netlify can pull them and serve them as a live website.

### What to do:

1. Open your browser and go to **github.com/new**
2. If you don't have a GitHub account, create one first (free)
3. Fill in the form:
   - **Repository name:** `powershift-website`
   - **Visibility:** Public
   - **DO NOT** tick "Add a README file" (we already have one)
4. Click **Create repository**
5. GitHub will show you a page with setup instructions — ignore most of it

### Now open Terminal on your Mac:

Press `Cmd + Space`, type `Terminal`, hit Enter. Then paste these commands one at a time:

```
cd ~/Documents/Claude/powershift-website
```

```
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/powershift-website.git
```
(Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username)

```
git branch -M main
```

```
git push -u origin main
```

If this is your first time using Git on this Mac, it will ask you to log in. A browser window will open — log into GitHub and authorise.

### How you know it worked:

Go to `github.com/YOUR-GITHUB-USERNAME/powershift-website` in your browser. You should see all the files — `index.html`, `solar.html`, `battery.html`, etc.

---

## Step 2: Deploy the Site on Netlify

**Time:** 5 minutes

Netlify is a free hosting platform. It connects to your GitHub repo and automatically publishes the site every time you push changes.

### What to do:

1. Go to **app.netlify.com**
2. Click **Sign up** → choose **Sign up with GitHub** (this is the easiest path)
3. Authorise Netlify to access your GitHub account
4. Once logged in, click **"Add new site"** → **"Import an existing project"**
5. Click **GitHub**
6. Find and select **powershift-website** from the list
7. On the build settings page:
   - **Build command:** leave this completely empty
   - **Publish directory:** type a single dot: `.`
8. Click **"Deploy site"**
9. Wait 30–60 seconds

### How you know it worked:

Netlify will give you a URL like `random-words-123.netlify.app`. Click it. Your site should load. Click through all 5 pages to make sure they work.

### Optional: Pick a nicer Netlify URL

1. Go to **Site configuration** → **General** → **Site details**
2. Click **"Change site name"**
3. Type `powershift-energy`
4. Your site is now at **powershift-energy.netlify.app**

Write down this Netlify URL — you'll need it in the next step.

---

## Step 3: Connect Your Domain (powershiftenergy.com.au)

**Time:** 10 minutes active, then 24–48 hours waiting

This is the step that points your real domain name to the Netlify site. There are two parts: tell Netlify about your domain, then tell VentraIP to point to Netlify.

### Part A: Add your domain in Netlify

1. In your Netlify site dashboard, click **"Domain management"** (in the left sidebar)
2. Click **"Add a domain"**
3. Type: `powershiftenergy.com.au`
4. Click **Verify** → **Add domain**
5. Netlify will show a warning that you need to configure DNS — that's what Part B is for

Also add `www.powershiftenergy.com.au` as a domain alias if Netlify gives you the option.

### Part B: Update DNS in VentraIP

This is where your domain `powershiftenergy.com.au` is registered. You need to tell VentraIP to send traffic to Netlify instead of wherever it currently points.

**Recommended approach: Change nameservers**

1. Log in at **ventraip.com.au** → go to **My Account**
2. Click **My Services** or **My Domains** (depends on VentraIP's current layout)
3. Find **powershiftenergy.com.au** and click **Manage**
4. Look for a **Nameservers** section (might be under "DNS" or "Domain Settings")
5. Replace the existing nameservers with Netlify's four nameservers:

```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

6. Save/Update

**Alternative approach (if you don't want to change nameservers):**

Instead of changing nameservers, go to **DNS Settings** in VentraIP and add these records:

| Type | Host/Name | Value |
|------|-----------|-------|
| A | @ | `75.2.60.5` |
| CNAME | www | `YOUR-SITE.netlify.app` |

(Replace `YOUR-SITE.netlify.app` with your actual Netlify URL from Step 2)

### Now you wait.

DNS changes take 24–48 hours to propagate worldwide. You can check progress at:
**dnschecker.org** — search for `powershiftenergy.com.au` and select "A" record.

When most locations show a green tick, you're good.

### Part C: Turn on HTTPS (after DNS propagates)

1. Go back to your Netlify dashboard → **Domain management** → scroll to **HTTPS**
2. Click **"Verify DNS configuration"**
3. If DNS has propagated, click **"Provision certificate"**
4. Wait 1–2 minutes
5. Done — your site now has the padlock icon (HTTPS)

If the button is greyed out, DNS hasn't propagated yet. Try again in a few hours.

### How you know it worked:

Open `https://powershiftenergy.com.au` in your browser. The site loads with a padlock icon. No warnings.

---

## Step 4: Activate the Lead Forms (Formspree)

**Time:** 2 minutes

The forms on the site send leads to Formspree, which then emails them to you. But Formspree needs to verify your email address first.

### What to do:

1. Go to your live site (the Netlify URL is fine — don't need to wait for DNS)
2. Submit a test entry on **each** of the 4 forms:
   - **solar.html** — solar form
   - **battery.html** — battery form
   - **ev-charger.html** — EV charger form
   - **electricians.html** — partner application form
3. Use fake but valid-looking data (the form validates phone numbers and postcodes):
   - Name: `Test User`
   - Phone: `0412345678`
   - Postcode: `4000`
   - Email: `braden@powershiftenergy.com.au`
   - Fill in all dropdowns
4. After submitting each form, check the inbox for **braden@powershiftenergy.com.au**
5. You'll receive a **verification email from Formspree** for each form
6. Click the **"Confirm form"** link in each email

### How you know it worked:

Submit another test entry after confirming. You should see a success message on the site ("Thanks! We've got your details.") and the submission should appear in your Formspree dashboard at **formspree.io/forms**.

### Your form endpoints (for reference):

| Page | Formspree ID |
|------|-------------|
| Solar | `xyklgzqn` |
| Battery | `xvzdpgje` |
| EV Charger | `mbdqrlnl` |
| Electricians | `mjgjbkny` |

---

## Step 5: Final Checks

Once DNS has propagated and the site is live at `powershiftenergy.com.au`, run through this checklist on your phone:

- [ ] **Homepage** loads at powershiftenergy.com.au
- [ ] **Solar page** loads — form submits correctly
- [ ] **Battery page** loads — form submits correctly
- [ ] **EV charger page** loads — form submits correctly
- [ ] **Electricians page** loads — form submits correctly
- [ ] **HTTPS padlock** shows on all pages (no "Not Secure" warning)
- [ ] **Phone number** (0427 430 088) is tappable and opens the dialler
- [ ] **FAQ sections** open and close when tapped (solar, battery, EV pages)
- [ ] **Navigation menu** works on mobile (hamburger icon)
- [ ] **All links** in the nav and footer go to the right pages
- [ ] **Form validation** works — try submitting empty, try a bad phone number

---

## Quick Reference

| What | Where |
|------|-------|
| Website files | `~/Documents/Claude/powershift-website/` |
| GitHub repo | `github.com/YOUR-USERNAME/powershift-website` |
| Netlify dashboard | `app.netlify.com` |
| VentraIP domain settings | `ventraip.com.au` → My Domains |
| Formspree dashboard | `formspree.io/forms` |
| DNS propagation check | `dnschecker.org` |
| Phone | 0427 430 088 |
| Email (forms go here) | braden@powershiftenergy.com.au |

---

## If Something Goes Wrong

**Site doesn't load after DNS change:**
Wait longer. DNS can take up to 48 hours. Check dnschecker.org.

**Forms don't submit:**
Check that you clicked the Formspree verification email. Check your spam folder.

**HTTPS won't provision:**
DNS hasn't propagated yet. Wait until dnschecker.org shows green ticks, then try again.

**Can't push to GitHub:**
Run `git config --global user.email "braden@powershiftenergy.com.au"` and `git config --global user.name "Braden"` first, then try the push again.

**Need to make a change to the site:**
Edit the files in `~/Documents/Claude/powershift-website/`, then run:
```
cd ~/Documents/Claude/powershift-website
git add -A
git commit -m "Description of what you changed"
git push
```
Netlify will automatically redeploy within 30 seconds.
