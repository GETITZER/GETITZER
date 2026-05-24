# CLAUDE.md

This file provides context for AI assistants working in this repository.

## Repository Overview

This is the **GETITZER/GETITZER** GitHub profile repository. It serves two purposes:

1. **GitHub profile page** — `README.md` at the root is automatically displayed on `github.com/GETITZER`.
2. **ISA Valve Solutions website** — a full-stack React + Express web app in the `website/` directory, AI-powered with Claude.

## Repository Structure

```
GETITZER/
├── README.md          # GitHub profile page (rendered on github.com/GETITZER)
├── CLAUDE.md          # This file
└── website/           # Full-stack ISA Valve Solutions web application
    ├── server/
    │   └── index.ts   # Express backend API (port 3001)
    ├── src/
    │   ├── components/ # Reusable React components
    │   ├── pages/      # Page-level components (React Router)
    │   ├── data/       # Product catalog data
    │   ├── hooks/      # Custom React hooks
    │   ├── types/      # TypeScript interfaces
    │   ├── App.tsx     # Router setup
    │   ├── main.tsx    # React entry point
    │   └── index.css   # Global styles (Tailwind layers)
    ├── index.html      # HTML entry point
    ├── package.json
    ├── vite.config.ts  # Vite config; proxies /api/* → localhost:3001
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── .env.example    # Required env vars template
```

## Tech Stack

**Frontend**
- React 18 + TypeScript (strict mode)
- Vite 5 (build tool and dev server, port 5173)
- React Router 6 (client-side routing)
- Tailwind CSS 3 (utility-first styling with custom brand theme)
- Lucide React (icons)

**Backend**
- Express 4 (HTTP API, port 3001)
- Anthropic SDK (`@anthropic-ai/sdk`) — Claude AI integration
- `tsx` for TypeScript-native Node execution

**Dev tooling**
- `concurrently` — runs Vite and Express together in one terminal
- `tsc -b` + `vite build` for production bundles

## Development Workflow

### Prerequisites

Copy `.env.example` to `.env` and supply a valid `ANTHROPIC_API_KEY`. The Express server warns on startup if the key is missing, and all AI features will fail without it.

### Running locally

All commands run from `website/`:

```bash
cd website
npm install          # first time
npm run dev          # Vite (5173) + Express (3001) with hot reload
npm run build        # TypeScript compile + production bundle → dist/
npm run preview      # Preview the production build locally
npm run server       # Run Express backend only (no frontend)
```

Open `http://localhost:5173`. Vite proxies `/api/*` to `http://localhost:3001`.

### There is no test suite

There is no test runner configured. Verification is done by running the app and exercising features manually.

## Key Source Files

| File | Purpose |
|------|---------|
| `server/index.ts` | All API endpoints; only file that imports `@anthropic-ai/sdk` |
| `src/data/products.ts` | Product catalog (4 valves) and industry data; source of truth for all product info |
| `src/types/index.ts` | Shared TypeScript interfaces (`Product`, `ChatMessage`, `RFQFormData`, etc.) |
| `src/App.tsx` | Route declarations |
| `src/hooks/useChat.ts` | SSE streaming logic reused by chat and content generation |
| `src/index.css` | Custom utility classes: `.btn-primary`, `.btn-secondary`, `.field-input`, `.card` |

## API Endpoints (Express, port 3001)

All endpoints accept and return JSON. Streaming endpoints emit Server-Sent Events (`data: <json>\n\n`).

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/chat` | Streaming chat; SSE; uses `claude-sonnet-4-6`, max 1024 tokens |
| `POST` | `/api/search` | AI product ranking; returns array of matching product IDs (max 5) |
| `POST` | `/api/generate` | Streaming technical content generation; SSE; max 2048 tokens |
| `POST` | `/api/rfq` | Non-streaming RFQ qualification analysis; max 1024 tokens |

## Pages and Components

**Pages** (`src/pages/`)
- `Home.tsx` — Landing page: hero, stats, product cards, industries grid, case study, CTA
- `Products.tsx` — Catalog grid with client-side filtering by name/industry/specs
- `ProductDetail.tsx` — Product detail with specs table, AI application guide generator (streams `/api/generate`)
- `RFQ.tsx` — 12-field quote request form; submits to `/api/rfq` for AI qualification

**Components** (`src/components/`)
- `Navigation.tsx` — Header with product dropdown and search button (`⌘K` hotkey)
- `ChatWidget.tsx` — Floating AI chatbot (bottom-right); context-aware system prompts per page
- `SearchModal.tsx` — Full-screen search modal (`⌘K` / `Esc`); AI ranking with client-side fallback
- `Footer.tsx` — Dark navy footer with company info, compliance, affiliate CTA, ISO badge

## Tailwind Brand Theme

Custom colors defined in `tailwind.config.ts`:
- `brand-*` — ISA blue (primary)
- `isa-*` — ISA orange (accent stripe)
- `navy` (`#0f2744`) — dark backgrounds (hero, footer)

Custom utility classes (defined in `src/index.css`):
- `.btn-primary`, `.btn-secondary` — button styles
- `.field-input` — form input style
- `.card` — card container
- `.cursor-blink`, `.slide-up`, `.fade-in` — animations for chat and search

## README.md Conventions

- Standard GitHub Flavored Markdown (GFM).
- Emojis are expected; GitHub renders them on the profile page.
- HTML comments (`<!-- -->`) are not rendered and can be used for notes.
- Preserve the HTML comment block at the bottom — it is part of the GitHub template.

## Branching

- `main` — production branch; `README.md` here is what GitHub displays on the profile.
- Feature branches (e.g. `claude/...`) — used for proposed changes before merging to `main`.

## Key Constraints

- Do not add CI workflows, Docker, or other infrastructure unless explicitly requested.
- Do not create additional Markdown files unless requested.
- When modifying API endpoints, keep them consistent with how `useChat.ts` and page components consume them (SSE format for streaming, plain JSON for non-streaming).
- All Claude API calls live in `server/index.ts` only — do not call the Anthropic API from the frontend.
- The product catalog (`src/data/products.ts`) is the single source of truth for valve data; keep pages and the backend system prompts in sync with it when products change.
