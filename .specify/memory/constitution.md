<!--
SYNC IMPACT REPORT
==================
Version Change: [Initial] → 1.0.0
Change Type: MAJOR - Initial constitution establishment

Modified Principles:
- NEW: All 12 core principles established

Added Sections:
- Core Principles (12 principles across code quality, performance, testing, UX, SEO, i18n, security, content, workflow, deployment, design)
- Performance Requirements
- Testing & Quality Assurance
- Development Workflow & Governance
- Governance

Removed Sections:
- None (initial creation)

Templates Requiring Updates:
✅ plan-template.md - Constitution Check section will reference these principles
✅ spec-template.md - Aligned with requirements structure
✅ tasks-template.md - Aligned with testing and workflow principles
⚠️ checklist-template.md - May need performance/accessibility checkpoints
⚠️ agent-file-template.md - Review for consistency

Follow-up TODOs:
- Ratification date set to initial commit date (2025-10-30)
- Monitor Lighthouse scores in CI/CD pipeline (establish baseline)
- Setup Web Vitals monitoring in production
- Configure pre-commit hooks for linting, type checking, formatting
- Implement Content Security Policy headers
- Setup GDPR-compliant cookie consent mechanism
- Establish monthly dependency review process
- Create privacy policy and terms of service pages

Rationale:
This is the initial comprehensive constitution for AutomX, a high-performance digital agency portfolio website.
Version 1.0.0 establishes all core principles as non-negotiable standards for the project.
-->

# AutomX Constitution

## Core Principles

### I. Code Quality & Architecture

**TypeScript strict mode is MANDATORY** for all components and utilities. Every file MUST pass ESLint and Prettier validation with zero warnings. Components MUST follow a clear separation of concerns with maximum 250 lines per file. Variable and function names MUST use camelCase and be meaningful (no abbreviations except standard conventions like `id`, `url`). All exported functions and components MUST have comprehensive JSDoc comments explaining purpose, parameters, return values, and usage examples.

**No console.logs in production code.** Use proper logging utilities or remove debug statements before commit. Prefer composition over inheritance. Apply DRY principle: abstract repeated logic into reusable utilities. Keep components pure and predictable where possible (same input = same output).

**Rationale**: Code quality directly impacts maintainability, onboarding speed, and bug reduction. Strict TypeScript catches errors at compile time. Consistent style reduces cognitive load during code reviews.

---

### II. Performance (NON-NEGOTIABLE)

AutomX MUST maintain **Lighthouse scores of 95+ across all metrics**: Performance, Accessibility, Best Practices, and SEO. Specific Core Web Vitals thresholds are MANDATORY:

- **First Contentful Paint (FCP)**: Under 1.2 seconds
- **Largest Contentful Paint (LCP)**: Under 2.5 seconds
- **Time to Interactive (TTI)**: Under 3.5 seconds
- **Cumulative Layout Shift (CLS)**: Under 0.1
- **Total Blocking Time (TBT)**: Under 200ms

**Bundle optimization**: Initial JavaScript MUST be under 100KB gzipped. All images MUST use WebP/AVIF formats with fallbacks and lazy loading beyond the viewport. Zero layout shifts during page load are required. Leverage Astro's static generation to minimize client-side JavaScript.

**Critical CSS MUST be inlined**, non-critical CSS deferred. Internal navigation links MUST be prefetched. Use View Transitions API for smooth navigation without heavy JavaScript frameworks. Monitor Web Vitals in production and alert on degradation.

**Rationale**: Performance is a competitive differentiator for a premium agency. Fast sites convert better, rank higher in search, and demonstrate technical excellence to potential clients.

---

### III. Testing & Validation (MANDATORY)

All utility functions MUST have unit tests. Contact form validation MUST be tested both client-side and server-side (n8n webhook). Cross-browser testing is REQUIRED on the latest 2 versions of Chrome, Firefox, Safari, and Edge.

**Responsive testing breakpoints**: 390px (mobile), 1440px (laptop), 1920px (desktop). Accessibility testing MUST include screen reader validation using NVDA (Windows) or VoiceOver (macOS). All interactive elements (forms, theme toggle, language switcher) MUST be manually tested.

**Performance testing with Lighthouse CI MUST run in the build pipeline** and fail the build if scores drop below thresholds. Visual regression testing is REQUIRED for critical pages (homepage, portfolio, contact). Test n8n webhook integration in a staging environment before production deployment.

**Rationale**: Testing prevents regressions, ensures cross-platform compatibility, and validates that performance and accessibility standards are maintained over time.

---

### IV. User Experience Consistency

All spacing MUST use Tailwind's default scale (4px base unit). Typography scale MUST be consistent across all pages with clear heading hierarchy. The color palette (dark grays, white, neon purple accent) MUST be strictly adhered to across all components.

**All interactive elements MUST provide clear hover and focus states** using the purple accent color with visible focus indicators styled with a purple accent ring. Loading states are REQUIRED for async operations (form submissions). Error states MUST display helpful, user-friendly messages. Success feedback MUST be provided for all user actions.

**Smooth animations**: 200-300ms duration with ease-in-out timing. No janky animations or abrupt transitions. Maintain visual hierarchy on all pages. Consistent CTA button styling and placement. **Mobile-first approach**: Design for 390px first, then scale up. Touch targets MUST be minimum 44x44px on mobile.

**Rationale**: Consistent UX builds trust and professionalism. Clear feedback prevents user confusion. Mobile-first ensures the majority of users (mobile traffic) have an optimal experience.

---

### V. SEO & Semantic HTML

Use **semantic HTML5 throughout**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`. Proper heading hierarchy is MANDATORY: single `<h1>` per page with logical `<h2>`-`<h6>` structure. Alt text for all images MUST be descriptive, not generic ("person smiling" not "image1").

**ARIA labels only where appropriate**; prefer semantic HTML over ARIA hacks. Keyboard navigation MUST be fully functional with logical tab order and focus management. Focus indicators MUST be visible (never `outline: none` without a replacement).

**Meta descriptions MUST be under 160 characters and unique per page.** Open Graph and Twitter Card tags REQUIRED on all pages. Structured data MUST include Organization, LocalBusiness, and Service schemas. XML sitemap MUST include language alternates (hreflang). Canonical URLs MUST be properly set. MUST pass Google Mobile-Friendly Test.

**Rationale**: Semantic HTML improves accessibility and SEO. Proper meta tags increase click-through rates from search results. Structured data helps search engines understand the business offering.

---

### VI. Internationalization (i18n)

All user-facing text MUST be externalized (no hardcoded strings in components). **French is the primary language, English is secondary.** Translation files MUST be organized by page/component for maintainability.

**Date and number formatting MUST be locale-aware.** Proper hreflang tags REQUIRED for both languages. Language switcher MUST preserve current page context (e.g., switching on `/a-propos` navigates to `/en/about`). URL pattern: `/` (French), `/en/` (English).

**Translation files MUST be validated for completeness** (ensure all keys exist in both French and English files). Missing translations MUST fail the build.

**Rationale**: i18n expands market reach. Proper implementation prevents broken experiences for English-speaking users. Locale-aware formatting shows attention to detail.

---

### VII. Security & Privacy

**GDPR compliance MANDATORY**: Cookie consent and data collection transparency required. Contact form validation MUST occur client-side (UX) and server-side (security) via n8n webhook. No sensitive data (API keys, secrets) in client-side code or Git repository.

**Content Security Policy (CSP) headers MUST be configured.** HTTPS only; enforce via redirects. Sanitize all user inputs before submission to prevent XSS attacks. Privacy policy and terms of service pages are REQUIRED before launch.

**Rationale**: Security protects users and the business. GDPR compliance is legally required in EU. CSP prevents XSS attacks. HTTPS is a ranking signal and builds trust.

---

### VIII. Content Management

Project markdown files MUST follow a consistent frontmatter schema (validate on build). All images MUST be stored in `/public/images/` with descriptive filenames (not `img001.jpg`). Markdown content MUST be validated against the schema during the build process.

**Translation files MUST be kept in sync** (automated validation checks for missing keys). Content changes MUST trigger rebuild and redeployment (CI/CD integration).

**Rationale**: Consistent schema enables automated validation and prevents runtime errors. Descriptive filenames improve maintainability. Sync validation prevents partial translations.

---

### IX. Development Workflow

**Git workflow**: Feature branches REQUIRED. Pull requests MUST be reviewed before merge. No commits directly to main branch. Commit messages MUST follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`, etc.).

**Pre-commit hooks MUST run**: Linting, type checking, formatting. All hooks MUST pass before commit is allowed. Staging environment MUST mirror production configuration. Environment variables for n8n webhook URLs and API keys MUST be managed securely (not in repository).

**Document all setup steps in README.md.** Keep dependencies up to date with monthly reviews (security patches applied immediately).

**Rationale**: Feature branches enable parallel work. PR reviews catch bugs and share knowledge. Pre-commit hooks prevent broken code from entering the repository. Conventional commits enable automated changelog generation.

---

### X. Deployment & Monitoring

**Automated deployments on main branch push.** Preview deployments REQUIRED for all pull requests (test before merge). Rollback strategy MUST be in place (ability to revert to previous deployment quickly).

**Monitor Core Web Vitals in production** (alert on degradation). Error tracking and logging MUST be configured (Sentry, LogRocket, or equivalent). Analytics MUST respect cookie consent (GDPR compliance). Regular performance audits REQUIRED (monthly Lighthouse reports).

**Rationale**: Automated deployment reduces human error. Preview deployments enable testing in production-like environment. Monitoring catches issues before users report them. Analytics inform optimization decisions.

---

### XI. Design Fidelity

**Pixel-perfect implementation of Figma designs.** Responsive breakpoints MUST match exactly: 390px, 1440px, 1920px. Neon purple hover effects MUST match design specifications (color, animation, duration).

**3D logo rendering quality MUST be maintained** (no blurry or low-resolution renders). Glass-morphism effects MUST be accurately implemented (backdrop-filter, opacity, borders). Spacing and typography MUST be exact to Figma measurements (use Figma inspect mode).

**Dark/light mode toggle behavior MUST be consistent with designs** (smooth transition, persistent preference, system preference detection).

**Rationale**: Design fidelity demonstrates professionalism and attention to detail. Pixel-perfect implementation shows respect for the design process and builds client trust in execution capability.

---

### XII. Accessibility (WCAG 2.1 AA Compliant)

**Color contrast MUST meet WCAG 2.1 AA standards**: 4.5:1 for normal text, 3:1 for large text. All form inputs MUST have associated labels (visible or aria-label). Error messages MUST be announced to screen readers (aria-live regions).

**Keyboard navigation MUST be complete**: All interactive elements accessible via Tab, Enter, Space, Escape keys. Focus trapping in modals (if used). Skip links for main content navigation.

**Image alt text MUST be descriptive and meaningful** (describe content and function, not just presence). Decorative images MUST use `alt=""` to hide from screen readers. ARIA landmarks used appropriately (`role="navigation"`, `role="main"`, etc.) but prefer semantic HTML.

**Rationale**: Accessibility is a legal requirement in many jurisdictions and an ethical imperative. 15%+ of users have some form of disability. Good accessibility improves usability for all users.

---

## Performance Requirements

### Core Web Vitals Thresholds (MANDATORY)

These thresholds MUST be maintained across all pages. Lighthouse CI in build pipeline MUST enforce these standards:

| Metric | Threshold | Measurement Context |
|--------|-----------|---------------------|
| Performance Score | 95+ | Lighthouse audit |
| Accessibility Score | 95+ | Lighthouse audit |
| Best Practices Score | 95+ | Lighthouse audit |
| SEO Score | 95+ | Lighthouse audit |
| First Contentful Paint (FCP) | < 1.2s | Real user monitoring |
| Largest Contentful Paint (LCP) | < 2.5s | Core Web Vital |
| Time to Interactive (TTI) | < 3.5s | Lighthouse metric |
| Cumulative Layout Shift (CLS) | < 0.1 | Core Web Vital |
| Total Blocking Time (TBT) | < 200ms | Lighthouse metric |
| Initial JavaScript Bundle | < 100KB (gzipped) | Build output analysis |

### Optimization Strategies (REQUIRED)

- **Static Generation**: Leverage Astro's static site generation to minimize JavaScript
- **Image Optimization**: WebP/AVIF with JPEG/PNG fallbacks, lazy loading beyond viewport, responsive sizes
- **Critical CSS**: Inline critical CSS in `<head>`, defer non-critical CSS
- **Prefetching**: Prefetch internal navigation links on hover/focus
- **View Transitions**: Use View Transitions API for smooth navigation without heavy frameworks
- **Code Splitting**: Dynamic imports for non-critical features (contact form validation, theme switcher)
- **Third-party Scripts**: Minimize or defer third-party scripts (analytics, fonts, etc.)

---

## Testing & Quality Assurance

### Test Coverage Requirements

- **Unit Tests**: All utility functions (TypeScript utilities, validation helpers, i18n utilities)
- **Integration Tests**: Contact form submission to n8n webhook, language switcher, theme toggle
- **Manual Testing**: All interactive elements across all breakpoints and browsers
- **Accessibility Testing**: Screen reader testing (NVDA on Windows, VoiceOver on macOS/iOS)
- **Performance Testing**: Lighthouse CI in build pipeline (fail build on regression)
- **Visual Regression**: Critical pages (homepage, portfolio, contact, about) using Percy or Chromatic

### Browser & Device Support

| Browser | Minimum Version |
|---------|----------------|
| Chrome | Latest 2 versions |
| Firefox | Latest 2 versions |
| Safari | Latest 2 versions |
| Edge | Latest 2 versions |

| Device Category | Test Breakpoint |
|----------------|----------------|
| Mobile | 390px (iPhone 14) |
| Laptop | 1440px (MacBook Pro 14") |
| Desktop | 1920px (1080p monitor) |

### Staging Environment Requirements

- **Configuration**: MUST mirror production (same build process, environment variables structure)
- **n8n Webhook**: Separate staging webhook URL for testing form submissions
- **Analytics**: Separate property to avoid polluting production data
- **Deployment**: Every PR MUST generate a preview deployment for testing

---

## Development Workflow & Governance

### Git Workflow (MANDATORY)

1. **Branching Strategy**:
   - `main` branch: Production-ready code only
   - Feature branches: `feat/feature-name`, `fix/bug-name`, `docs/update-name`
   - No direct commits to `main` (enforce via branch protection)

2. **Commit Message Format** (Conventional Commits):
   ```
   <type>(<scope>): <description>

   [optional body]

   [optional footer]
   ```
   Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

3. **Pull Request Process**:
   - All PRs MUST be reviewed by at least one other developer
   - PR description MUST include: What changed, why, testing performed
   - PR checks MUST pass: Linting, type checking, tests, Lighthouse CI
   - Preview deployment MUST be verified before merge

### Pre-Commit Hooks (MANDATORY)

Configure Husky and lint-staged to run:
- ESLint (with `--max-warnings 0`)
- TypeScript type checking (`tsc --noEmit`)
- Prettier formatting check
- Markdown linting for content files

Commits MUST NOT be allowed if any hook fails.

### Dependency Management

- **Monthly Review**: Check for outdated dependencies, security vulnerabilities
- **Security Patches**: Apply immediately (within 48 hours of disclosure)
- **Major Updates**: Test thoroughly in staging before production
- **Lock Files**: Commit `package-lock.json` or `pnpm-lock.yaml` to ensure reproducible builds

### Documentation Requirements

- **README.md**: Setup instructions, environment variables, development commands, deployment process
- **Code Comments**: JSDoc for all exported functions/components, inline comments for complex logic
- **Architecture Decisions**: Document major architectural decisions (ADRs) in `docs/` folder
- **Changelog**: Maintain `CHANGELOG.md` following Keep a Changelog format

---

## Governance

### Constitution Authority

This constitution supersedes all other development practices, coding standards, and workflow documents. Any conflict between this constitution and other documentation MUST be resolved in favor of the constitution.

### Amendment Process

1. **Proposal**: Submit PR with proposed amendment to `.specify/memory/constitution.md`
2. **Discussion**: Team reviews and discusses impact (minimum 48-hour review period)
3. **Approval**: Requires unanimous approval from all core developers
4. **Migration Plan**: Document migration steps for existing code if principles change
5. **Version Bump**: Follow semantic versioning for constitution versions
   - **MAJOR**: Backward-incompatible governance/principle removals or redefinitions
   - **MINOR**: New principle/section added or materially expanded guidance
   - **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements

### Compliance Review

- **PR Reviews**: All PRs MUST verify compliance with constitution principles
- **Monthly Audits**: Review codebase for constitution compliance (Lighthouse scores, accessibility, test coverage)
- **Violation Handling**: Any principle violation MUST be documented with justification and remediation plan
- **Continuous Improvement**: Constitution MUST be reviewed quarterly for relevance and effectiveness

### Complexity Justification

Any violation of constitution principles (e.g., exceeding performance thresholds, skipping tests, reducing accessibility) MUST be:
1. Documented in PR description with explicit justification
2. Approved by all core developers
3. Include remediation plan with timeline
4. Tracked as technical debt in project management tool

**No exceptions without documented approval.**

---

**Version**: 1.0.0 | **Ratified**: 2025-10-30 | **Last Amended**: 2025-10-30
