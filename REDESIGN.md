# CivicPulse redesign plan

## Audit
- Reddit-style 3-column app: Navbar, LeftSidebar, feed, RightSidebar; pages: Home, GovPortals, Submit, PostDetail, GovDashboard.
- State lives in CivicContext; data is mockData.ts (22 KB).
- Very large pages (PostDetail 36 KB, GovDashboard 32 KB, Submit 30 KB, PostCard 23 KB) with hard-coded hex colors.
- Navbar hides search below md and has no mobile nav; the Citizen/Official toggle is a fake role switch.
- dist/ was committed; no .gitignore, lint, tests or CI.

## Goals
1. Trust and clarity: a calm, credible look instead of neon orange on black.
2. Mobile-first: bottom nav, mobile search, 44px touch targets.
3. Accessibility: skip link, landmarks, focus rings, aria labels, reduced motion.
4. Maintainable: tokens in Tailwind, split big pages into feature components.

## Phases
- Phase 1 (this commit): .gitignore, tokens, Navbar, Layout (+footer, mobile nav).
- Phase 2: shared ui/ components (Button, Card, Badge, Input, Modal, Skeleton); migrate hard-coded hex to tokens.
- Phase 3: split PostDetail, GovDashboard, Submit, PostCard into features/*; add a lib/api service layer over mockData.
- Phase 4: landing hero with 3-step how-it-works, anonymous-reporting trust section, public stats.
- Phase 5: lazy routes, SEO/OG meta, Lighthouse >= 90, ESLint, Vitest, GitHub Actions.
- Phase 6: replace mock data with Supabase (auth, reports, storage, RLS).

## Backlog before shipping
- Remove committed dist/ (git rm -r civicpulse/dist).
- Replace the Citizen/Official toggle with real auth roles.
