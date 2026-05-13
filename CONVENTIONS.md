# Coding Standards & Naming Conventions

## 1. Naming Conventions
- **Folders & Files**: `kebab-case` (e.g., `student-list.tsx`, `auth-service.ts`).
- **React Components**: `PascalCase` (e.g., `StudentCard.tsx`).
- **Functions & Variables**: `camelCase` (e.g., `getUserByEmail`).
- **TypeScript Interfaces/Types**: `PascalCase` (e.g., `UserResponse`).
- **Database Tables**: `snake_case` (via Prisma `@@map`).
- **Enums**: `UPPER_SNAKE_CASE` (e.g., `PAYMENT_STATUS`).

## 2. Directory Structure (Feature-Based)
Each feature in `src/features/[feature-name]` should follow:
- `components/`: UI specific to this feature.
- `actions/`: Server actions for mutations.
- `services/`: Database queries and third-party logic.
- `hooks/`: Local state or data fetching hooks.
- `schemas/`: Zod validation schemas.
- `types/`: Feature-specific TypeScript definitions.

## 3. Coding Principles
- **Surgical Server Actions**: Keep actions thin; move heavy logic to `services/`.
- **Zod Everywhere**: All inputs (forms and action arguments) must be validated with Zod.
- **Strict TypeScript**: Avoid `any`. Use `satisfies` and `Pick/Omit` for clean types.
- **Client vs. Server**: Default to Server Components. Use `'use client'` only when interactivity (hooks) is required.
- **Shadcn/UI**: Never modify `components/ui/` directly if avoidable; wrap them in `components/shared/` if custom logic is needed.

## 4. Auth & Authorization
- **Middleware**: Use for high-level route protection (e.g., `/admin/*`).
- **Server Components**: Check session/role at the page level for granular control.
- **Services**: Always verify ownership/roles inside the service layer (Double Security).
