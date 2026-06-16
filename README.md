# RateLimitr — Frontend

Marketing site and dashboard for [RateLimitr](https://ratelimitr.com), a production-grade rate limiting service. Built with Next.js 16, React 19, and Tailwind CSS v4.

## Backend

The backend API and rate-limiting engine lives at [github.com/iyanubruce/rate-limiter](https://github.com/iyanubruce/rate-limiter).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS v4, Lucide React
- **Charts:** Recharts
- **Language:** TypeScript (strict)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://api.ratelimitr.com/v1` | Backend API base URL |

## Routes

| Path | Description |
|---|---|
| `/` | Landing page |
| `/docs` | API documentation |
| `/auth/login` | Login |
| `/auth/register` | Sign up |
| `/dashboard` | Overview metrics |
| `/dashboard/api-keys` | API key management |
| `/dashboard/analytics` | Analytics & charts |
| `/dashboard/billing` | Plan & billing |

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
