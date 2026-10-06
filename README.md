# AgroCoop 🌱

**Community-owned. Community-driven.**
A React / Next.js agricultural cooperative platform for Nigerian farmers.

> "Stronger Farmers. Stronger Communities."

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with the AgroCoop brand palette
- **Framer Motion** animations
- **shadcn/ui-style components** (hand-rolled primitives in `components/ui/`)
- **Zustand** (persisted client state), **TanStack Query**, **React Hook Form + Zod**, **Lucide React**

## Color palette

| Token | Hex | Use |
| --- | --- | --- |
| Cooperative Blue | `#2563EB` | Primary buttons, navigation, trust |
| Harvest Gold | `#D97706` | CTAs, rewards, achievements |
| Growth Green | `#059669` | Progress, growth, sustainability |
| Warm Sand | `#F5F5F4` | Backgrounds, cards |
| Deep Earth | `#44403C` | Text, headings |
| Cooperative Coral | `#F97316` | Notifications, community |
| Sky Unity | `#E0F2FE` | Info banners |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Project structure

```
app/
  (marketing)/        Home, About, Cooperatives, Cooperative detail
  (onboarding)/       Start Cooperative (7-step wizard), Join Cooperative
  (dashboard)/        Dashboard, Voting, Resources, Marketplace, Learning, Community
components/
  ui/                 shadcn-style primitives (button, card, badge, tabs, …)
  animations/         FadeIn, ScrollReveal, StaggerContainer, PageTransition, Counter
  home/               Hero, HowCoopsWork, FeaturesGrid, ImpactStats, SuccessStories, Principles, JoinCTA
  cooperatives/       CoopButton, CoopCard, CoopBadge, CoopAvatar, VoteMeter, ProgressBar, directory
  onboarding/         Stepper + wizards
  layout/             MarketingHeader/Footer, DashboardSidebar/Topbar, BottomNav
lib/
  data/               Mock data (13 coops, 54 members, 8 votes, 24 resources, …)
  images.ts           Curated Unsplash farming imagery
  store.ts            Zustand store
  constants.ts        ICA principles, states, crops, navigation
```

## Animation specs

- **Page transition** — `opacity 0→1`, `scale 0.98→1`, 500ms, ease-out
- **Scroll reveal** — `opacity 0→1`, `y 40→0`, 700ms, stagger 80ms, `viewport={{ once: true }}`
- **Hover / tap** — `scale 1.02` / `scale 0.98`

## Navigation

- **Mobile:** bottom navigation — Home, Coops, Resources, Community, Profile
- **Desktop:** sidebar with Dashboard, Voting, Resources, Marketplace, Learning, Community
