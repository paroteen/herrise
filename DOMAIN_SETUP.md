# Domain Setup Guide: herrisedevelopment.org

This guide will help you connect your custom domain `herrisedevelopment.org` to your Vercel deployment.

## Step 1: Add Domain to Vercel

1. **Log in to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Navigate to your project dashboard

2. **Open Project Settings**
   - Click on your project: `herrise-development-organisation` (or the name you used)
   - Go to **Settings** → **Domains**

3. **Add Your Domain**
   - Click **Add Domain** or **Add** button
   - Enter your domain: `herrisedevelopment.org`
   - Also add the `www` version: `www.herrisedevelopment.org` (optional but recommended)
   - Click **Add**

## Step 2: Configure DNS Records

Vercel will show you the DNS records you need to add. You'll need to configure these at your domain registrar (where you bought the domain).

### Option A: Using A Record (Root Domain)

Add these DNS records at your domain registrar:

**For herrisedevelopment.org (root domain):**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

**For www.herrisedevelopment.org:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

### Option B: Using CNAME (Recommended - Easier)

If your DNS provider supports CNAME flattening or ALIAS records:

**For herrisedevelopment.org:**
```
Type: CNAME (or ALIAS)
Name: @ (or root)
Value: cname.vercel-dns.com
TTL: 3600
```

**For www.herrisedevelopment.org:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

## Step 3: Common Domain Registrar Instructions

### If you bought from Namecheap:
1. Go to [Namecheap Dashboard](https://www.namecheap.com)
2. Click **Domain List** → Select `herrisedevelopment.org`
3. Click **Advanced DNS** tab
4. Add the DNS records as shown above
5. Save changes

### If you bought from GoDaddy:
1. Go to [GoDaddy Domain Manager](https://dcc.godaddy.com)
2. Select `herrisedevelopment.org`
3. Click **DNS** or **Manage DNS**
4. Add the DNS records
5. Save changes

### If you bought from Google Domains:
1. Go to [Google Domains](https://domains.google.com)
2. Click on `herrisedevelopment.org`
3. Go to **DNS** section
4. Add the DNS records
5. Save changes

### If you bought from Cloudflare:
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your domain
3. Go to **DNS** → **Records**
4. Add the DNS records
5. Make sure **Proxy status** is set to **DNS only** (gray cloud) initially

## Step 4: Wait for DNS Propagation

- DNS changes can take **24-48 hours** to fully propagate
- Usually works within **1-2 hours**
- You can check propagation status at: [whatsmydns.net](https://www.whatsmydns.net)

## Step 5: SSL Certificate (Automatic)

- Vercel automatically provisions SSL certificates via Let's Encrypt
- Once DNS is configured, SSL will be active within minutes
- Your site will be accessible at `https://herrisedevelopment.org`

## Step 6: Verify Domain in Vercel

1. Go back to Vercel → Settings → Domains
2. You should see your domain with a status indicator
3. Status will show:
   - ⏳ **Pending** - DNS not configured yet
   - ✅ **Valid** - Domain is connected and working
   - ⚠️ **Invalid** - Check DNS configuration

## Step 7: Redirect www to Non-www (Optional)

If you want to redirect `www.herrisedevelopment.org` → `herrisedevelopment.org`:

1. In Vercel → Settings → Domains
2. Click on `www.herrisedevelopment.org`
3. Enable **Redirect** to `herrisedevelopment.org`

Or vice versa if you prefer www as primary.

## Troubleshooting

### Domain not working after 24 hours?
1. **Check DNS records** - Make sure they're exactly as Vercel specified
2. **Clear DNS cache** - Try accessing from different network/device
3. **Check DNS propagation** - Use [whatsmydns.net](https://www.whatsmydns.net)
4. **Verify in Vercel** - Check domain status in Vercel dashboard

### SSL Certificate issues?
- Wait 5-10 minutes after DNS is configured
- Make sure DNS is fully propagated
- Contact Vercel support if issues persist

### Need help?
- Vercel Documentation: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

## After Setup

Once your domain is connected:
- Your site will be live at `https://herrisedevelopment.org`
- The old `herrise.vercel.app` URL will still work (redirects automatically)
- Update any links/bookmarks to use the new domain
- Update social media profiles and business cards

---

**Note:** Make sure your Vercel project is connected to your GitHub repository for automatic deployments.



