# Instagram Intelligence OS

**An AI-powered personal knowledge base for your Instagram saves.**

Most people save hundreds of posts and reels and never find them again. Instagram Intelligence OS turns that unstructured saved content into a searchable, organized knowledge base with search, smart collections, trend detection and a creator CRM.

**Live demo:** https://instagram-intelligence-os.vercel.app

## The problem

The Instagram "Saved" tab is a dumping ground. Recipes, workouts, travel ideas and products all sit in one feed with no search and no structure, so their value is lost.

## Modules

| Route | Feature |
|---|---|
| `/` | Dashboard: stats across all modules |
| `/search` | AI Saved Search: natural-language search over saved posts |
| `/collections` | Smart Collections: auto-sorted topic folders |
| `/reels` | Reel Summarizer: bullet takeaways per reel |
| `/travel` | Travel Planner: day-by-day itinerary from saved posts |
| `/recipes` | Recipe Extractor: structured ingredients and steps |
| `/workouts` | Workout Planner: weekly routine from saved fitness posts |
| `/shopping` | Shopping Assistant: saved products with price tracking |
| `/trends` | Trend Detector: rising topics with trend score and sparkline |
| `/crm` | Creator CRM: collab status and notes per creator |
| `/digest` | Weekly AI Digest: Sunday recap with stats and insights |

## How I built it

I came up with the concept and defined the product strategy, then built it with Claude Code, versioned it on GitHub and deployed it on Vercel.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Vercel

**Status:** prototype. All data is mocked locally (`lib/data/seed.json`). There is no real Instagram API integration, by design, because the API is private and rate limited and scraping carries terms of service risk.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

---
Built by [Sumedh Bundele](https://github.com/sumedhbundelework-ship-it), Senior Product Manager.
