# Instagram Intelligence OS

An AI-powered knowledge base prototype for Instagram saved content — turns saved posts and reels into searchable, structured, actionable data across 10 modules.

**Live demo:** https://instagram-intelligence-os.vercel.app

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui

All data is mocked locally (`lib/data/seed.json`) — no real Instagram API integration, by design (rate-limited/private API, ToS risk).

## Modules

| Route | Feature |
|---|---|
| `/` | Dashboard — stats across all modules |
| `/search` | AI Saved Search — natural-language style search over saved posts |
| `/collections` | Smart Collections — auto-sorted topic folders |
| `/reels` | Reel Summarizer — AI-style bullet takeaways per reel |
| `/travel` | Travel Planner — generates a day-by-day itinerary from selected posts |
| `/recipes` | Recipe Extractor — structured ingredients + steps |
| `/workouts` | Workout Planner — weekly routine table from saved fitness posts |
| `/shopping` | Shopping Assistant — saved products with price-change tracking |
| `/trends` | Trend Detector — rising topics with trend score + sparkline |
| `/crm` | Creator CRM — editable collab status & notes per creator |
| `/digest` | Weekly AI Digest — Sunday recap with stats + insight blurb |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
