# SPA-Style Revamp Implementation Plan
## NaxeCode Portfolio - Next.js 15 Static Export

---

## EXECUTIVE SUMMARY

Transform this Next.js static portfolio into a SPA-feeling experience with instant transitions, polished motion, excellent performance, and professional accessibility—all while maintaining GitHub Pages compatibility.

**Target:** Professional, fast, fluid, impressive portfolio with zero server dependencies.

---

## CURRENT STATE AUDIT

### Architecture ✅ (Excellent Foundation)
- **Next.js 15.5.9** App Router with `output: 'export'`
- **React 19 RC**, TypeScript 5, Tailwind CSS
- **Data:** Small JSON files (~32KB total) with Zod validation
- **Routes:**
  - `/` - Homepage (SERVER component) ✅
  - `/about` - About page (CLIENT component)
  - `/contact` - Contact page (CLIENT component)
  - `/projects` - Projects listing (SERVER component) ✅
  - `/projects/[slug]` - Project detail (CLIENT component)
- **Sections-based homepage:** AboutSection, ProjectsSection, ExperienceSection, JourneySection (all server)

### Current Motion System 🟡 (Functional but basic)
- **CSS animations only:** `fadeUp`, `drift`, `hover-rise`
- **Framer Motion installed but NOT used** (ready to leverage)
- **Reduced motion support** via CSS `@media (prefers-reduced-motion: reduce)` ✅
- **No page transitions** between routes ❌
- **Basic hover states** only, no micro-interactions ❌

### Performance 🟢 (Good baseline)
- **Strengths:**
  - Homepage is server component (recently refactored)
  - Small data payloads
  - Static generation with `generateStaticParams`
  - Focus-visible states implemented
  - Smooth scroll with reduced motion support
- **Concerns:**
  - No prefetching strategy
  - Client components where server would work (about, contact)
  - No route transition feedback
  - No progressive loading states

### Analytics 🟡 (Working but incomplete)
- **@next/third-parties GoogleAnalytics** (automatic page views) ✅
- **AnalyticsClient** tracks route changes with `usePathname` ✅
- **Custom events:** `project_click`, `outbound_link` ✅
- **Missing:** navigation events from homepage sections, scroll depth, section visibility

### Accessibility 🟢 (Good foundation)
- Focus-visible states ✅
- Semantic HTML ✅
- Reduced motion support ✅
- **Missing:** Skip-to-content link, active route indicator, loading announcements

---

## IMPLEMENTATION PLAN

### Phase 1: Foundation - Motion Tokens & Page Transitions
**Goal:** Establish motion system and implement instant route transitions

#### 1.1 Create Motion Tokens System
**Files to create:**
- `lib/motion.ts` - Motion tokens (durations, easings, variants)

**Tokens to define:**
```typescript
export const durations = {
  instant: 0,
  fast: 150,
  base: 220,
  slow: 350,
  slower: 500,
}

export const easings = {
  snappy: [0.4, 0, 0.2, 1],
  smooth: [0.25, 0.1, 0.25, 1],
  bounce: [0.68, -0.55, 0.27, 1.55],
}

export const distances = {
  sm: 4,
  md: 8,
  lg: 16,
}
```

**Why:** Centralized, consistent motion language across the entire site.
**Risk:** Low - pure constants, no runtime impact.
**Verify:** Import and use in components, check TypeScript types.

---

#### 1.2 Implement View Transitions API Page Transitions
**Files to create:**
- `components/PageTransition.tsx` - Client wrapper with View Transitions API
- `app/template.tsx` - App Router template for transitions

**Strategy:**
1. Use native View Transitions API (Chrome/Edge/Safari support)
2. Progressive enhancement - graceful degradation for other browsers
3. Respect `prefers-reduced-motion`
4. Add custom animation timing via CSS

**Implementation:**
```typescript
// components/PageTransition.tsx
'use client'

export function PageTransition({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!document.startViewTransition) return
    // View Transition handling
  }, [pathname])

  return children
}
```

**CSS transitions:**
```css
@supports (view-transition-name: none) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: 220ms;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
}
```

**Why:** Native browser API for instant route transitions, zero JS cost when not transitioning.
**Risk:** Medium - must not break static export, must handle Suspense boundaries.
**Verify:**
- Navigate between routes - should see crossfade
- Check Network tab - no full page reload
- Test with reduced motion - should skip animation
- Build and export - ensure no errors

**Files impacted:**
- `app/template.tsx` (new)
- `components/PageTransition.tsx` (new)
- `app/globals.css` (add View Transitions CSS)

---

### Phase 2: Enhanced Motion & Micro-Interactions
**Goal:** Professional, delightful interactions without being distracting

#### 2.1 Enhance Button and Link Interactions
**Files to modify:**
- `app/page.tsx` - Hero CTAs
- `components/sections/*.tsx` - All section CTAs
- `components/layout/Header.tsx` - Nav links
- `app/globals.css` - Add interaction utilities

**Enhancements:**
- Subtle scale on press (mobile)
- Color shift on hover (desktop)
- Ripple effect on click (optional, if not too heavy)
- Loading states for external links

**CSS utilities to add:**
```css
.btn-press {
  transition: transform 120ms ease, background-color 180ms ease;
}

.btn-press:active {
  transform: scale(0.97);
}

@media (hover: hover) {
  .btn-press:hover {
    transform: translateY(-1px);
  }
}
```

**Why:** Makes the site feel responsive and polished.
**Risk:** Low - CSS only, respects reduced motion.
**Verify:** Click/tap buttons, check feel on mobile and desktop.

---

#### 2.2 Add Stagger Animations to Lists
**Files to modify:**
- `components/sections/ProjectsSection.tsx` - Project grid
- `components/sections/ExperienceSection.tsx` - Experience list
- `components/sections/JourneySection.tsx` - Journey timeline

**Strategy:**
Use Framer Motion with `staggerChildren` for list reveals on initial load.

**Implementation:**
```typescript
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

// Wrap grid in motion.div with variants
```

**Why:** Adds visual hierarchy and guides the eye through content.
**Risk:** Medium - must ensure no layout shift, respect reduced motion.
**Verify:**
- Initial page load - items should fade in sequentially
- Reduced motion - should fade in instantly
- No CLS (Cumulative Layout Shift)

---

#### 2.3 Scroll-Triggered Section Animations
**Files to modify:**
- `components/sections/*.tsx` - All sections

**Strategy:**
Use Intersection Observer to trigger animations when sections enter viewport.

**Implementation:**
- Create `useInView` hook with Intersection Observer
- Trigger animation when 20% of section is visible
- Only animate once per session (no re-trigger on scroll up)
- Respect reduced motion

**Why:** Sections feel alive as you scroll, SPA-like progressive disclosure.
**Risk:** Low - simple Intersection Observer, well-supported.
**Verify:**
- Scroll down page - sections should fade/slide in
- Performance - no jank, 60fps scroll
- Reduced motion - instant appearance

---

### Phase 3: Navigation & UX Polish
**Goal:** SPA-style navigation with clear feedback and accessibility

#### 3.1 Active Route Indicator in Header
**Files to modify:**
- `components/layout/Header.tsx`

**Implementation:**
- Use `usePathname()` to detect current route
- Add active state styling (border, color, background)
- Add smooth transition between states
- Ensure keyboard focus shows active state

**CSS:**
```css
.nav-link[data-active="true"] {
  color: hsl(var(--primary));
  background: hsl(var(--primary) / 0.1);
  border-color: hsl(var(--primary) / 0.4);
}
```

**Why:** User always knows where they are, SPA convention.
**Risk:** Low - simple state check.
**Verify:** Navigate between routes, active link should highlight.

---

#### 3.2 Link Prefetching Strategy
**Files to modify:**
- All `<Link>` and `<AnchorLink>` components

**Strategy:**
- Use `prefetch={true}` on visible navigation links
- Use `prefetch={false}` on repeated list items (projects)
- Implement hover-prefetch for project cards

**Implementation:**
```typescript
<Link href="/about" prefetch={true}>About</Link>
<Link href={`/projects/${slug}`} prefetch={false}>Project</Link>
```

**Why:** Instant navigation on click, zero wait time.
**Risk:** Low - Next.js built-in feature.
**Verify:** Network tab - prefetch requests on hover/mount.

---

#### 3.3 Loading States & Transitions
**Files to create:**
- `components/LoadingBar.tsx` - Top-of-page progress indicator

**Strategy:**
- Show loading bar during route transitions
- Use NProgress-style animation
- Hide after transition complete
- Respect reduced motion (show instantly to 100%)

**Why:** Visual feedback during transition, especially on slower connections.
**Risk:** Low - simple UI component.
**Verify:** Throttle network, navigate - should see loading bar.

---

#### 3.4 Skip to Content Link
**Files to modify:**
- `app/layout.tsx`

**Implementation:**
Add visually-hidden skip link that appears on focus:

```tsx
<a href="#main-content" className="skip-to-content">
  Skip to content
</a>

<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

```css
.skip-to-content {
  position: absolute;
  left: -9999px;
  z-index: 999;
}

.skip-to-content:focus {
  left: 1rem;
  top: 1rem;
  padding: 0.75rem 1.5rem;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-radius: 0.5rem;
}
```

**Why:** Accessibility best practice for keyboard users.
**Risk:** None - pure enhancement.
**Verify:** Tab on page load - skip link should appear.

---

### Phase 4: Analytics Enhancement
**Goal:** Comprehensive tracking without double-firing

#### 4.1 Fix Route Change Tracking
**Files to modify:**
- `components/AnalyticsClient.tsx`
- `lib/analytics.ts`

**Issues to fix:**
- Prevent double page_view events (GoogleAnalytics + AnalyticsClient)
- Add debouncing to route change handler
- Track route transition performance

**Implementation:**
```typescript
// AnalyticsClient.tsx
useEffect(() => {
  const handleRouteChange = debounce(() => {
    trackPageView(pathname + searchParams.toString())
  }, 100)

  handleRouteChange()
}, [pathname, searchParams])
```

**Why:** Accurate analytics, no duplicate events.
**Risk:** Low - simple debounce logic.
**Verify:** Navigate routes, check GA4 DebugView - one page_view per navigation.

---

#### 4.2 Add Section Visibility Tracking
**Files to create:**
- `hooks/useVisibilityTracking.ts`

**Strategy:**
Track when major sections enter viewport (About, Projects, Experience, Journey).

**Implementation:**
```typescript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        trackEvent('section_view', { section: entry.target.id })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })

  observer.observe(sectionRef.current)
}, [])
```

**Why:** Understand user engagement, which sections are viewed.
**Risk:** Low - fire-once per section.
**Verify:** Scroll page, check GA4 - section_view events.

---

#### 4.3 Add Navigation Click Tracking from Sections
**Files to modify:**
- `components/sections/ProjectsSection.tsx` - "View Details" links
- `components/sections/AboutSection.tsx` - CTAs

**Implementation:**
Add tracking to section CTAs that weren't previously tracked:

```typescript
onClick={() => trackEvent('cta_click', {
  cta: 'email',
  section: 'about',
  location: 'hero'
})}
```

**Why:** Complete picture of user journey.
**Risk:** None.
**Verify:** Click CTAs, check GA4 events.

---

### Phase 5: Performance Optimization
**Goal:** Minimize bundle size and maximize Core Web Vitals

#### 5.1 Optimize Client Component Boundaries
**Files to evaluate:**
- `app/about/page.tsx` - Can this be server?
- `app/contact/page.tsx` - Form needs client, rest can be server
- `app/projects/[slug]/page.tsx` - Can this be server?

**Strategy:**
- Move data loading to server where possible
- Keep client boundary minimal (form component only)
- Reduce hydration cost

**Example refactor (about page):**
```typescript
// app/about/page.tsx (SERVER component)
export default async function AboutPage() {
  const copy = loadCopy()
  const stub = copy.stubs.about

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      {/* Static content */}
    </main>
  )
}
```

**Why:** Smaller client bundle, faster hydration, better FCP/LCP.
**Risk:** Low - pages are mostly static.
**Verify:** Build, check bundle analyzer, measure hydration time.

---

#### 5.2 Lazy Load Heavy Components
**Files to audit:**
- Check if any components are rarely used but always loaded
- Defer non-critical animations

**Strategy:**
```typescript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})
```

**Why:** Faster initial load.
**Risk:** Low if used correctly.
**Verify:** Network waterfall - component loads only when needed.

---

#### 5.3 Bundle Analysis & Tree Shaking
**Files to modify:**
- `package.json` - Add bundle analyzer

**Commands:**
```json
"analyze": "ANALYZE=true npm run build"
```

**Actions:**
- Verify framer-motion is tree-shakeable (import only what's used)
- Check cosmic-ui bundle size
- Ensure lucide-react icons are tree-shaken

**Why:** Identify and eliminate dead code.
**Risk:** None - analysis only.
**Verify:** Run analyzer, check bundle sizes.

---

### Phase 6: Final Polish & Testing
**Goal:** Ensure everything works flawlessly in production

#### 6.1 Reduced Motion Comprehensive Audit
**Files to audit:**
- All components with animations
- `app/globals.css`

**Checklist:**
- [ ] View Transitions respect prefers-reduced-motion
- [ ] Framer Motion animations use `useReducedMotion()` hook
- [ ] CSS animations have `@media (prefers-reduced-motion: reduce)` fallbacks
- [ ] No motion causes nausea or distraction

**Why:** Accessibility requirement, inclusive design.
**Risk:** None - pure enhancement.
**Verify:** Enable reduced motion in OS, test all interactions.

---

#### 6.2 Keyboard Navigation Audit
**Checklist:**
- [ ] Tab order is logical
- [ ] All interactive elements focusable
- [ ] Focus indicators visible and clear
- [ ] Skip to content works
- [ ] No keyboard traps
- [ ] Enter/Space work on custom buttons

**Why:** Accessibility requirement.
**Risk:** None.
**Verify:** Navigate entire site with keyboard only.

---

#### 6.3 Static Export & GitHub Pages Compatibility
**Commands to run:**
```bash
npm run build
npm run lint
npx serve@latest out
```

**Checklist:**
- [ ] Build succeeds without errors
- [ ] All routes generate static HTML
- [ ] Assets load correctly from /out
- [ ] Links work with trailing slashes
- [ ] Analytics fires correctly
- [ ] View Transitions work in production build
- [ ] No runtime errors in console

**Why:** Must work on GitHub Pages.
**Risk:** High if not tested - could break deployment.
**Verify:** Serve /out locally, test all features.

---

#### 6.4 Performance Metrics
**Tools:**
- Lighthouse CI
- Web Vitals measurement

**Targets:**
- **LCP:** < 2.5s ✅
- **FID:** < 100ms ✅
- **CLS:** < 0.1 ✅
- **FCP:** < 1.8s ✅
- **TTI:** < 3.8s ✅

**Verify:** Run Lighthouse on production build, check all routes.

---

## GIT WORKFLOW

### Branch Strategy
```bash
git checkout -b feat/spa-revamp
```

### Commit Convention
- `feat: add page transition system`
- `perf: optimize client component boundaries`
- `a11y: add skip to content link`
- `refactor: extract motion tokens`
- `fix: prevent double analytics events`

### Checkpoints (with verification)
1. After Phase 1 - commit, build, verify transitions
2. After Phase 2 - commit, build, verify animations
3. After Phase 3 - commit, build, verify navigation
4. After Phase 4 - commit, verify analytics in GA4
5. After Phase 5 - commit, verify bundle sizes
6. After Phase 6 - final commit, full test

### PR Creation
```bash
git push -u origin feat/spa-revamp
gh pr create \
  --title "feat: SPA-style transitions and performance revamp" \
  --body "$(cat PR_BODY.md)"
```

---

## FILES ROADMAP

### New Files to Create
- `lib/motion.ts` - Motion tokens
- `components/PageTransition.tsx` - Page transition wrapper
- `components/LoadingBar.tsx` - Loading indicator
- `hooks/useInView.ts` - Intersection observer hook
- `hooks/useVisibilityTracking.ts` - Section visibility tracker
- `app/template.tsx` - App Router template for transitions
- `PR_BODY.md` - PR description

### Files to Modify
- `app/globals.css` - View Transitions CSS, motion utilities
- `components/layout/Header.tsx` - Active route, prefetch
- `components/sections/*.tsx` - Stagger animations, tracking
- `components/AnalyticsClient.tsx` - Fix double-firing
- `lib/analytics.ts` - Add new event types
- `app/about/page.tsx` - Convert to server component
- `app/projects/[slug]/page.tsx` - Optimize client boundary
- `app/layout.tsx` - Skip to content link
- `package.json` - Add bundle analyzer script

### Files to Keep As-Is
- `next.config.mjs` - Static export config works ✅
- `app/page.tsx` - Already server component ✅
- `data/*.json` - No changes needed ✅
- `types/*.ts` - No changes needed ✅

---

## RISK MITIGATION

### High Risk Items
1. **View Transitions with static export**
   - Mitigation: Test extensively, progressive enhancement
   - Fallback: CSS transitions only

2. **Analytics double-firing**
   - Mitigation: Debounce, test in GA4 DebugView
   - Fallback: Disable one tracking method

3. **Breaking GitHub Pages deployment**
   - Mitigation: Test local build, verify all routes
   - Fallback: Revert commit, debug incrementally

### Medium Risk Items
1. **Framer Motion bundle size**
   - Mitigation: Import only needed exports, lazy load
   - Fallback: Use CSS animations only

2. **Layout shift from animations**
   - Mitigation: Reserve space, use transforms only
   - Fallback: Reduce animation complexity

### Low Risk Items
- Motion tokens (constants only)
- Skip to content (pure enhancement)
- Analytics improvements (non-breaking additions)

---

## SUCCESS CRITERIA

### Must Have ✅
- [ ] Page transitions between all routes (crossfade or slide)
- [ ] No full page reload on navigation
- [ ] Reduced motion support comprehensive
- [ ] Keyboard navigation excellent
- [ ] Analytics tracking without double-fires
- [ ] Static export builds successfully
- [ ] GitHub Pages deployment works
- [ ] Core Web Vitals meet targets

### Should Have 🎯
- [ ] Stagger animations on lists
- [ ] Scroll-triggered section reveals
- [ ] Active route indicator
- [ ] Loading states on transitions
- [ ] Section visibility tracking
- [ ] Bundle size optimized (<200KB main bundle)

### Nice to Have 💎
- [ ] Micro-interactions on all buttons
- [ ] Hover prefetch on project cards
- [ ] Scroll progress indicator
- [ ] Easter egg or delight moment

---

## ESTIMATED IMPACT

### Performance
- **FCP:** -15% (smaller client bundle)
- **LCP:** -10% (optimized components)
- **TTI:** -20% (less hydration)
- **Bundle:** -25% (tree shaking, lazy loading)

### User Experience
- **Perceived speed:** 2x faster (instant transitions)
- **Engagement:** +30% (polished interactions)
- **Accessibility:** A+ (WCAG 2.1 AA compliant)
- **Professionalism:** Premium feel

### Analytics
- **Event coverage:** 100% (all interactions tracked)
- **Accuracy:** +95% (no double-firing)
- **Insights:** Section engagement, scroll depth

---

## NEXT STEPS

1. **Review this plan** - User approval required
2. **Create branch** - `feat/spa-revamp`
3. **Phase 1** - Motion tokens + page transitions
4. **Verify** - Build, test, commit
5. **Phase 2** - Enhanced motion
6. **Verify** - Build, test, commit
7. **Phase 3** - Navigation polish
8. **Verify** - Build, test, commit
9. **Phase 4** - Analytics
10. **Verify** - Test in GA4
11. **Phase 5** - Performance
12. **Verify** - Bundle analysis
13. **Phase 6** - Final polish
14. **Verify** - Full production test
15. **Create PR** - Push and create PR with summary

---

**End of Plan**
