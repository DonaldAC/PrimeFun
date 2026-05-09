# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PrimeFun (internal name: "funda") is an Angular 11 SPA for business funding/lending. Users create accounts, complete onboarding steps, and submit funding applications that are automatically synced to Pipedrive CRM via Firebase Cloud Functions.

## Commands

### Frontend (Angular)
```bash
npm start           # Dev server at http://localhost:4200
ng serve            # Equivalent
ng build            # Development build
ng build --prod     # Production build
ng test             # Run Karma/Jasmine unit tests
ng test --include=src/app/path/to/component.spec.ts  # Run a single test file
ng lint             # TSLint
ng e2e              # Protractor end-to-end tests
```

### Cloud Functions (`functions/` directory)
```bash
npm run build       # Compile TypeScript
npm run serve       # Build + start Firebase emulators (functions only)
npm run deploy      # Deploy functions to Firebase
npm run logs        # Tail Firebase function logs
npm run lint        # ESLint
```

### Firebase
```bash
firebase emulators:start   # Start all local emulators
firebase deploy            # Full deploy (hosting + functions)
```

## Architecture

**Module structure (lazy-loaded):**
- `home/` — Public landing page (marketing sections, navbar, footer)
- `accounts/` — Auth flows (signup, login, password reset) + `AccountsService` for all Firestore reads/writes
- `dashboard/` — Protected post-login area; multi-step "Get Started" onboarding
- `auth/` — Thin `AuthService` wrapper around Firebase Auth
- `chat/` — Messaging feature (dashboard-embedded)
- `shared/` — Reusable components (accordion, progress-loader, switch-toggle) and the `OnlyNumber` directive

**Data flow:**
1. User completes onboarding forms in the dashboard → data saved to Firestore via `AccountsService`
2. `newApplicationListener` Cloud Function fires on document create → creates a Pipedrive deal
3. `UpdateApplicationListener` Cloud Function fires on document update → syncs changes to Pipedrive

**Key files:**
- `src/app/app-routing.module.ts` — Top-level lazy-loaded routes
- `src/app/auth/auth.service.ts` — Firebase Auth wrapper (login, signup, session)
- `src/app/accounts/services/accounts.service.ts` — All Firestore operations
- `functions/src/index.ts` — Both Cloud Function triggers (Pipedrive integration)
- `src/constants/` — Calendly URLs, funding purposes, revenue ranges, currencies
- `src/environments/` — Firebase project config (dev vs prod)

**Styling:** Bootstrap 4 + SCSS. Component styles are co-located (`.component.scss`). Global styles in `src/styles.scss`. Max TSLint line length is 140 characters; use single quotes; 2-space indentation.
