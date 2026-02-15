@echo off
echo Committing package.json and lockfile...
git add package.json package-lock.json
git commit -m "build(deps): update dependencies and install @types/react-router-dom"

echo Committing .env...
git add .env
git commit -m "config(env): configure environment variables with VITE_ALLOWED_USERS"

echo Committing index.css...
git add src/index.css
git commit -m "style(ui): define primary color palette and tailwind v4 theme"

echo Committing AuthContext...
git add src/context/AuthContext.tsx
git commit -m "feat(auth): implement auth context with dynamic user support and lazy initialization"

echo Committing Login.tsx...
git add src/pages/auth/Login.tsx
git commit -m "feat(auth): implement login page with environment-based validation"

echo Committing ReportIncident.tsx...
git add src/pages/shared/ReportIncident.tsx
git commit -m "fix(incident): resolve FormEvent deprecation and accessibility issues"

echo Committing Users.tsx...
git add src/pages/admin/Users.tsx
git commit -m "fix(admin): resolve ambiguous spacing and enforce stricter types"

echo Committing Verification.tsx...
git add src/pages/admin/Verification.tsx
git commit -m "fix(admin): replace label tags with spans for semantic correctness"

echo Committing Search.tsx...
git add src/pages/employer/Search.tsx
git commit -m "fix(employer): ensure deterministic match scores and accessible labels"

echo Committing Profile.tsx...
git add src/pages/worker/Profile.tsx
git commit -m "fix(worker): use strict union types for profile status"

echo Committing remaining files...
git add .
git commit -m "chore: add remaining project files and configuration"

echo Done.
