# HerRise Development Organisation

A website for HerRise Development Organisation - a national Non-Governmental Organisation committed to advancing the rights, wellbeing, and empowerment of women and girls across Uganda.

## 🌐 Live Site

**Official Website:** [herrisedevelopment.org](https://herrisedevelopment.org)

**Vercel Preview:** [herrise.vercel.app](https://herrise.vercel.app)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/paroteen/herrise.git
   cd herrise
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🏗️ Project Structure

- `/pages` - React page components (including `/admin` for story management)
- `/components` - Reusable React components
- `/data` - Shared data (e.g. impact stories when not using Supabase)
- `/hooks` - React hooks (e.g. useStories, useStory)
- `/utils` - Utilities (Supabase client, IremboPay, stories API)
- `/public` - Static assets (images, robots.txt, sitemap.xml)
- `/types.ts` - TypeScript type definitions

## ⚙️ Environment variables

Copy `.env.example` to `.env` and set optional values:

- `VITE_IREMBO_PAY_URL` – IremboPay payment page (donations)
- `VITE_CONTACT_FORM_ENDPOINT` – POST URL for contact form (e.g. Formspree)
- `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` – For impact stories from DB and `/admin` (create first admin user in Supabase Dashboard → Authentication → Users)

## 🎯 Features

- Responsive design; Tailwind CSS (build-step, not CDN)
- Pages: Home, About, Programmes, Partnerships, Projects, M&E, Get Involved, Contact, Impact Stories
- Impact stories: static data by default; optional Supabase backend with **Admin** at `/admin` (sign in to add/edit/delete stories)
- Donations: wired to IremboPay (opens payment in new tab)
- Contact form: controlled inputs; optional backend via `VITE_CONTACT_FORM_ENDPOINT`
- SEO: per-page meta, Open Graph, Twitter Card, Schema.org (ItemList/Article), robots.txt, sitemap

## 🔧 Maintenance

Run periodically to check for vulnerabilities and outdated packages:

```bash
npm audit
npm outdated
```

Fix reported issues and lock or upgrade dependencies as needed.

## 📝 License

This project is private and proprietary to HerRise Development Organisation.
