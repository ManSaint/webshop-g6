<div align="center">

<br>

# ✦ &ensp; G E E S I X &ensp; ✦

### Sharp silhouettes for a quieter kind of statement.

<br>

A modern, full-stack fashion webshop built as a group project at [Lexicon](https://lexicon.se)<br>Frontend System Development — 2025 / 2026

<br>

[![Live App](https://img.shields.io/badge/▶_Live_App-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://webshop-g6-theta.vercel.app)
&emsp;
[![Design Mockups](https://img.shields.io/badge/✦_Design_Mockups-3D3024?style=for-the-badge&logo=github&logoColor=white)](https://mansaint.github.io/webshop-g6/mockups/)

<br>

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

GEESIX is a fashion-forward e-commerce platform with curated collections, category browsing, cart and wishlist management, user authentication with role-based admin access, and a full product management panel. The project emphasizes clean editorial design, responsive layouts, and a modern developer experience powered by the React 19 + Next.js 16 stack with the React Compiler enabled.

Product data was originally sourced from [DummyJSON](https://dummyjson.com/docs/products) and seeded into a **Supabase Postgres** database, which serves as the sole backend for the production app.

---

## Features

| Area | Highlights |
|---|---|
| **Storefront** | Hero banner, new arrivals grid, category browsing, paginated product collection with sorting |
| **Product Detail** | Image gallery, pricing, related products, add-to-cart with toast notifications |
| **Cart** | Zustand store with Supabase sync — merges local cart with server on login |
| **Wishlist** | Save favourites locally or synced to Supabase for logged-in users |
| **Authentication** | Clerk-powered sign-in/sign-up with protected routes via Next.js middleware |
| **Admin Panel** | Role-gated (Clerk `publicMetadata.role`), full product CRUD |
| **Contact** | Contact form with server-side email delivery via Nodemailer |
| **Database** | Supabase Postgres with Row-Level Security, migrations, and seed script |
| **DX** | Biome linting & formatting, TypeScript strict mode, Tailwind CSS v4, React Compiler |

---

## Project Structure

```
webshop-g6/
├── app/
│   ├── admin/              # Role-gated admin dashboard & product CRUD
│   ├── api/contact/        # Contact form API route (Nodemailer)
│   ├── cart/               # Shopping cart page
│   ├── contact/            # Contact form page
│   ├── customer/
│   │   ├── categories/     # Category listing
│   │   ├── collection/     # Product browsing with pagination & sorting
│   │   ├── products/       # Product detail pages
│   │   └── wishlist/       # Wishlist page
│   ├── globals.css         # Tailwind v4 theme & global styles
│   ├── layout.tsx          # Root layout (Clerk + header/footer)
│   └── page.tsx            # Home — hero, new arrivals, categories
├── components/
│   ├── admin-ui/           # Admin-specific components
│   ├── customer-ui/        # Customer-specific components
│   ├── header.tsx          # Navigation, auth, cart icon
│   ├── footer.tsx          # Site footer
│   ├── hero.tsx            # Hero banner
│   └── ...
├── data/                   # Static data & type definitions
├── docs/mockups/           # 9 interactive HTML design mockups
├── lib/
│   ├── db.ts               # All Supabase queries (products, cart, wishlist)
│   ├── supabase/           # Supabase client setup (admin + browser)
│   ├── cart-store.ts       # Zustand cart store
│   ├── wishlist-store.ts   # Zustand wishlist store
│   ├── types.ts            # Shared TypeScript interfaces
│   └── ...
├── supabase/
│   ├── migrations/         # Database schema migrations
│   └── seed.ts             # Seed script (DummyJSON → Supabase)
├── middleware.ts            # Clerk auth + admin route protection
├── biome.json              # Biome linter/formatter config
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (or [Bun](https://bun.sh))
- A [Supabase](https://supabase.com) project — create one and run the migration & seed files in `supabase/`
- A [Clerk](https://clerk.com) application — for authentication and admin role management

### 1. Clone & install

```bash
git clone https://github.com/ManSaint/webshop-g6.git
cd webshop-g6
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
```

Fill in your Supabase and Clerk keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### 3. Start the dev server

```bash
npm run dev
```

Open **http://localhost:3000** to view the store.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Biome check |
| `npm run format` | Biome format (auto-fix) |

---

## Design Mockups

Before writing code, the team explored **9 interactive HTML mockups** — three design directions for each core page — to align on visual identity and layout decisions. All mockups are fully responsive with working hover effects, menus, tabs, and accordions.

<div align="center">

[![Browse the Mockup Gallery](https://img.shields.io/badge/✦_Browse_Mockup_Gallery-3D3024?style=for-the-badge&logo=github&logoColor=white)](https://mansaint.github.io/webshop-g6/mockups/)

</div>

| Page | V1 | V2 | V3 |
|---|---|---|---|
| **Home** | "The Editorial" — full-bleed hero, 3-col arrivals | "The Gallery" — split hero, masonry grid | "The Storefront" — dramatic hero, 4-col grid |
| **Product** | "The Lookbook" — sticky info panel, accordion | "The Showcase" — auto-advancing carousel, tabs | "The Split" — 50/50 scroll gallery |
| **Search** | "The Filter Sidebar" — classic sidebar + grid | "The Top Bar" — horizontal dropdowns, quick-view | "The Minimal" — search-first, masonry Pinterest |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) — App Router, Turbopack, React Compiler |
| **UI** | [React 19](https://react.dev) |
| **Language** | [TypeScript 5](https://typescriptlang.org) (strict mode) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **State** | [Zustand](https://zustand.docs.pmnd.rs) (cart + wishlist) |
| **Auth** | [Clerk](https://clerk.com) (sign-in, sign-up, admin roles) |
| **Database** | [Supabase](https://supabase.com) (Postgres + RLS) |
| **Icons** | [Lucide React](https://lucide.dev) |
| **Notifications** | [react-hot-toast](https://react-hot-toast.com) |
| **Email** | [Nodemailer](https://nodemailer.com) |
| **Linting** | [Biome 2](https://biomejs.dev) |
| **Deployment** | [Vercel](https://vercel.com) |

---

## Acknowledgements

Product catalog adapted from [DummyJSON](https://dummyjson.com). Built as part of the Lexicon Frontend System Development program, 2025–2026 cohort.

---

<div align="center">
<sub>Made with care by <strong>Group 6</strong> at Lexicon</sub>
</div>
