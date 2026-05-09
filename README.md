# PrimeFun

A web application for business funding and lending. Users create accounts, complete a multi-step onboarding flow, and submit funding applications that are automatically synced to Pipedrive CRM via Firebase Cloud Functions.

## Tech Stack

- **Frontend:** Angular 11, TypeScript, Bootstrap 4, SCSS
- **Backend:** Firebase (Firestore, Auth, Storage, Hosting, Cloud Functions)
- **CRM Integration:** Pipedrive (via Cloud Functions triggered on Firestore writes)
- **Scheduling:** Calendly (embedded iframes)

## Getting Started

### Prerequisites

- Node.js 12+
- Angular CLI: `npm install -g @angular/cli`
- Firebase CLI: `npm install -g firebase-tools`

### Install dependencies

```bash
npm install
cd functions && npm install && cd ..
```

### Development server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

### Environment configuration

Copy `src/environments/environment.ts` and populate it with your Firebase project credentials before running locally.

## Commands

| Command | Description |
|---|---|
| `ng serve` | Start dev server at localhost:4200 |
| `ng build` | Development build (output: `dist/`) |
| `ng build --prod` | Production build with optimizations |
| `ng test` | Run unit tests via Karma/Jasmine |
| `ng lint` | Run TSLint |
| `ng e2e` | Run end-to-end tests via Protractor |

### Cloud Functions (`functions/` directory)

| Command | Description |
|---|---|
| `npm run build` | Compile TypeScript |
| `npm run serve` | Build + start Firebase emulators |
| `npm run deploy` | Deploy functions to Firebase |
| `npm run logs` | Tail live function logs |

## Project Structure

```
src/app/
├── home/          # Public landing page
├── accounts/      # Signup, login, password reset + Firestore service
├── dashboard/     # Protected post-login onboarding flow
├── auth/          # Firebase Auth wrapper service
├── chat/          # Messaging feature
└── shared/        # Reusable components and directives

functions/src/
└── index.ts       # Firestore triggers → Pipedrive CRM sync
```

## Deployment

```bash
firebase deploy            # Deploy hosting + functions
firebase deploy --only hosting
firebase deploy --only functions
```
