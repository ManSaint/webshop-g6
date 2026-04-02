<div align="center">

# ✦ GEESIX ✦

**Sharp silhouettes for a quieter kind of statement.**

A modern, full-stack fashion webshop built as a group project at [Lexicon](https://lexicon.se) — Frontend System Development 2025–2026.

[![Live App](https://img.shields.io/badge/▶_Live_App-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://webshop-g6-theta.vercel.app)
[![Design Mockups](https://img.shields.io/badge/✦_Design_Mockups-3D3024?style=for-the-badge&logo=github&logoColor=white)](https://mansaint.github.io/webshop-g6/mockups/)

---

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat-square&logo=supabase&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)
![Biome](https://img.shields.io/badge/Biome_2-60A5FA?style=flat-square&logo=biome&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-433E38?style=flat-square&logo=react&logoColor=white)

</div>

---

## About

GEESIX is a fashion-forward e-commerce platform featuring curated collections, category browsing, cart management, user authentication, and an admin panel. The project emphasizes clean editorial design, responsive layouts, and a modern developer experience powered by the React 19 + Next.js 16 stack with the React Compiler enabled.

> **Data source** — Product data originates from [dummyjson.com](https://dummyjson.com/docs/products), modified to fit the store's aesthetic. A local [json-server](https://github.com/typicode/json-server/tree/v0.17.4) instance mirrors those endpoints during development.

---

## Features

| Area | Highlights |
|---|---|
| **Storefront** | Hero banner, new arrivals grid, category browsing, full-text product search with filtering & sorting |
| **Product Detail** | Image gallery, pricing, add-to-cart with toast notifications |
| **Cart** | Persistent cart state via Zustand, quantity controls, order summary |
| **Authentication** | Clerk-powered sign-in/sign-up with protected routes via middleware |
| **Admin Panel** | Product management (CRUD), category oversight |
| **Contact** | Contact form with server-side email delivery (Nodemailer) |
| **Database** | Supabase integration with Row-Level Security policies |
| **DX** | Biome linting & formatting, TypeScript strict mode, Tailwind CSS v4, React Compiler |

---

## Project Structure

```
webshop-g6/
├── app/
│   ├── admin/          # Admin dashboard & product management
│   ├── api/            # API routes (Next.js Route Handlers)
│   ├── cart/           # Shopping cart page
│   ├── contact/        # Contact form page
│   ├── customer/       # Customer-facing collection & product pages
│   ├── globals.css     # Tailwind v4 theme & global styles
│   ├── layout.tsx      # Root layout (Clerk provider, header, footer)
│   └── page.tsx        # Home page (hero, arrivals, categories)
├── components/         # Shared UI components
│   ├── admin-ui/       # Admin-specific components
│   ├── customer-ui/    # Customer-specific components
│   ├── header.tsx      # Site header with navigation & auth
│   ├── footer.tsx      # Site footer
│   ├── hero.tsx        # Hero banner component
│   └── ...
├── data/               # Static data & type definitions
├── docs/
│   └── mockups/        # Interactive HTML design mockups (9 variants)
├── lib/                # Supabase client, utilities
├── server/             # json-server config & product database
├── supabase/           # Supabase migrations & seed data
├── utils/              # Shared helper functions
├── middleware.ts        # Clerk auth middleware
├── biome.json          # Biome linter/formatter config
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (or [Bun](https://bun.sh))
- A [Clerk](https://clerk.com) application (for authentication)
- A [Supabase](https://supabase.com) project (for database)

### 1. Clone & install

```bash
git clone https://github.com/ManSaint/webshop-g6.git
cd webshop-g6
npm install
```

### 2. Configure environment

Copy the example env file and fill in your keys:

```bash
cp .env.local.example .env.local
```

### 3. Run the full dev environment

This starts both the Next.js frontend (port 3000) and the json-server mock API (port 4000) concurrently:

```bash
npm run dev:full
```

Open **http://localhost:3000** to view the store.
The mock API is available at **http://localhost:4000**.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Next.js dev server only |
| `npm run dev:full` | Next.js + json-server concurrently |
| `npm run mock-server` | json-server on port 4000 |
| `npm run build` | Production build |
| `npm run lint` | Biome check |
| `npm run format` | Biome format (auto-fix) |

---

## API Reference

The mock server (port 4000) exposes the following endpoints:

**Products** — `GET /products` · `GET /products/:id` · `POST /products`

**Categories** — `GET /categories` · `GET /categories/:id` · `GET /categories?slug=:slug`

**Pagination** — `GET /products?_page=1&_limit=10` (includes `X-Total-Count` header and pagination metadata)

**Sorting** — `GET /products?_sort=price&_order=asc`

**Filtering** — `GET /products?price_gte=10&price_lte=50` · `GET /products?q=mascara`

> See [json-server v0.17.4 docs](https://github.com/typicode/json-server/tree/v0.17.4) for the full query syntax.

---

## Design Mockups

Before writing code, the team explored **9 interactive HTML mockups** — 3 design directions for each core page — to align on visual identity and layout decisions. All mockups are fully responsive with working hover effects, menus, tabs, and accordions.

<div align="center">

[![Browse the Mockup Gallery](https://img.shields.io/badge/✦_Browse_Mockup_Gallery-3D3024?style=for-the-badge&logo=github&logoColor=white)](https://mansaint.github.io/webshop-g6/mockups/)

</div>

| Page | V1 | V2 | V3 |
|---|---|---|---|
| **Home** | "The Editorial" — full-bleed hero, 3-col arrivals | "The Gallery" — split hero, masonry grid | "The Storefront" — dramatic hero, 4-col grid |
| **Product** | "The Lookbook" — sticky info panel, accordion | "The Showcase" — auto-advancing carousel, tabs | "The Split" — 50/50 scroll gallery |
| **Search** | "The Filter Sidebar" — classic sidebar + grid | "The Top Bar" — horizontal dropdowns, quick-view | "The Minimal" — search-first, masonry Pinterest |

> **GitHub Pages setup** — The mockups live in `docs/mockups/`. To host them, enable GitHub Pages in your repo settings → **Source: Deploy from a branch** → **Branch: `main`** → **Folder: `/docs`**. The gallery will be available at `https://mansaint.github.io/webshop-g6/mockups/`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) with App Router & Turbopack |
| **UI** | [React 19](https://react.dev) with the React Compiler (`babel-plugin-react-compiler`) |
| **Language** | [TypeScript 5](https://typescriptlang.org) (strict mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **State** | [Zustand](https://zustand.docs.pmnd.rs) |
| **Auth** | [Clerk](https://clerk.com) |
| **Database** | [Supabase](https://supabase.com) (Postgres + RLS) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Notifications** | [react-hot-toast](https://react-hot-toast.com) |
| **Email** | [Nodemailer](https://nodemailer.com) |
| **Mock API** | [json-server v0.17.4](https://github.com/typicode/json-server/tree/v0.17.4) |
| **Linting** | [Biome 2](https://biomejs.dev) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## Acknowledgements

Product data adapted from [DummyJSON](https://dummyjson.com). Built as part of the Lexicon Frontend System Development program, 2025–2026 cohort.

---

<div align="center">
<sub>Made with care by <strong>Group 6</strong> at Lexicon</sub>
</div>
