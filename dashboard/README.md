This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🚀 Key Features

- **Intelligence Dashboard**: Global and city-level restaurant performance analytics.
- **Organic Design**: Modern, fresh UI inspired by high-end culinary photography.
- **Predictive Modeling**: ML-driven rating predictions using Random Forest.
- **Comparison Engine**: Side-by-side market analysis with automated delta insights.
- **Map Intelligence**: Real-time neighborhood discovery using Google Maps API.
- **Professional Reporting**: PDF export and automated email transmission via SMTP.

## 🛠️ Configuration

To enable the **Map Discovery** feature, add your Google Maps API key to `.env.local`:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

Ensure the following APIs are enabled in your Google Cloud Console:
- Maps JavaScript API
- Places API (New)
- Maps Static API (optional)
