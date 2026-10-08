# Development Workflow Guide

This guide details the standard day-to-day development workflow for both human engineers and AI coding assistants.

---

## 1. The Standard Feature Development Cycle

Follow this disciplined pipeline from task kickoff to production merge:

```text
1. Branch / Feature Setup
        ↓
2. Contract / Schema Definition (Zod + OpenAPI)
        ↓
3. Domain Implementation (src/features/<feature>/)
        ↓
4. Unit & Component Tests (Vitest + RTL)
        ↓
5. Storybook States (Loading, Empty, Error, Filled)
        ↓
6. Code Formatting (pnpm format)
        ↓
7. Linting Verification (pnpm lint)
        ↓
8. Type Checking (pnpm typecheck)
        ↓
9. API Freshness Check (pnpm api:check)
        ↓
10. Test Suite Pass (pnpm test)
        ↓
11. Production Build (pnpm build)
        ↓
12. Critical Journey E2E (pnpm test:e2e)
        ↓
13. Conventional Commit & Push
```

---

## 2. Developer Command Reference

| Command                | Action                                                                         | Use Case                                          |
| :--------------------- | :----------------------------------------------------------------------------- | :------------------------------------------------ |
| `pnpm setup`           | Interactive wizard: renames project, sets up metadata, manages example feature | Initial project setup from template               |
| `pnpm template:clean`  | Purges example feature headlessly for a clean architectural slate              | Quick blank project initialization                |
| `pnpm dev`             | Starts Next.js development server at `http://localhost:3000`                   | Local interactive feature development             |
| `pnpm build`           | Compiles Next.js for production with static analysis and route tree generation | Pre-release sanity check & production deployment  |
| `pnpm start`           | Serves the production build locally                                            | Verifying production runtime behavior             |
| `pnpm format`          | Runs Prettier across all files with automatic fix                              | Before committing or submitting PR                |
| `pnpm format:check`    | Verifies code formatting without altering any files                            | CI pipeline validation                            |
| `pnpm lint`            | Runs ESLint 9 with Next.js & React 19 plugins                                  | Identifying syntax, hook, or typing issues        |
| `pnpm lint:fix`        | Automatically fixes autofixable ESLint errors                                  | Fast remediation of lint rules                    |
| `pnpm typecheck`       | Executes `tsc --noEmit` in strict mode                                         | Verifying TypeScript type safety                  |
| `pnpm api:generate`    | Generates TypeScript types and fetch SDK from OpenAPI spec                     | When backend OpenAPI spec changes                 |
| `pnpm api:check`       | Verifies committed generated API files are up to date                          | CI pipeline check to prevent stale generated code |
| `pnpm test`            | Runs Vitest unit & component test suites                                       | Fast local automated testing                      |
| `pnpm test:watch`      | Runs Vitest in interactive file-watching mode                                  | TDD / test-driven development                     |
| `pnpm test:coverage`   | Generates detailed code coverage metrics                                       | Quality and regression auditing                   |
| `pnpm storybook`       | Boots isolated Storybook UI environment on port 6006                           | Visual component development                      |
| `pnpm storybook:build` | Builds static production Storybook bundle                                      | CI checks & static hosting                        |
| `pnpm test:e2e`        | Runs Playwright end-to-end tests headless                                      | Verifying complete user journeys                  |
| `pnpm test:e2e:ui`     | Opens the interactive Playwright UI runner                                     | Debugging browser tests step-by-step              |
| `pnpm verify`          | Runs format check, lint, typecheck, unit tests, and production build           | Fast pre-push verification script                 |
| `pnpm ci`              | Executes `pnpm verify` followed by `pnpm test:e2e`                             | Complete CI verification gate                     |

---

## 3. Git Commit Discipline

Follow conventional commit standards:

- `feat:` for new capabilities or user-facing additions.
- `fix:` for bug fixes.
- `chore:` for dependency updates, tooling, and snapshot restore points.
- `refactor:` for code restructuring without behavioral change.
- `docs:` for documentation updates.
- `test:` for adding or updating test cases.

### Restore Point Rule:

Before starting a batch of edits or major refactoring, always commit a restore point:

```powershell
git add -A; git commit -m "chore: snapshot before <brief description>"
```

Once changes pass all verification checks (`pnpm verify`), commit the final conventional commit:

```powershell
git add -A; git commit -m "<type>: <description of completed work>"
```
