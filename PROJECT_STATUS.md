# Coaching Center Management System (CCMS) - Project Roadmap & Status

This document serves as the "Source of Truth" for the project. It tracks completed milestones, the current architectural state, and the immediate work plan. Use this to resume development after a break.

## 🚀 Project Overview
A full-stack management system tailored for Bangladeshi coaching centers (Science, Commerce, Arts), supporting role-based dashboards, automated billing, and student performance tracking.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Prisma 7 (with PgAdapter), Better Auth, Tailwind CSS, shadcn/ui, Neon PostgreSQL.

---

## ✅ Completed Milestones

### 1. Foundation & Architecture
- [x] Initialized Next.js 15 with TypeScript and Tailwind CSS.
- [x] Implemented **Feature-Based Folder Structure** (`src/features/...`) for scalability.
- [x] Configured **Prisma 7** with Neon PostgreSQL (including connection pooling support).
- [x] Set up **Better Auth** with a custom `role` field in the session.
- [x] Established **Coding Conventions** (`CONVENTIONS.md`) for consistency.

### 2. Database & Data Modeling (ER Full)
- [x] Designed and migrated a comprehensive ER schema including:
    - **Identity**: User, Session, Account, Verification.
    - **Profiles**: Student (with `PENDING/ACTIVE` status), Teacher.
    - **Academics**: Group, Subject, Batch, Enrollment.
    - **Finance**: Payment (Invoices/Receipts).
    - **Academic**: Exam, Result, Attendance, Notice.
- [x] **Seeded Academic Catalog**: Populated Science, Commerce, and Arts groups with their respective subjects.
- [x] **Profile Extensions**: Added bio, phone, and professional descriptions to User and Teacher models.

### 3. Auth & Authorization (RBAC)
- [x] Defined Roles: `ADMIN`, `MANAGER`, `TEACHER`, `STUDENT`, `USER` (Visitor).
- [x] Implemented **Middleware Protection**:
    - Automatic redirection to role-specific dashboards.
    - Granular route guarding.
- [x] **Profile Management Logic**:
    - [x] Backend services for self-service profile updates (Bio, Photo, Phone).
    - [x] Secure password change logic via Better Auth.
    - [x] Teacher-specific professional description management.

### 4. Billing & Financial Engine (Backend)
- [x] **Fee Configuration**: Logic to define base prices for Groups (Full Package) vs. Individual Subjects.
- [x] **Monthly Billing Logic**: Service to generate "Due" records (Invoices) for all active students.
- [x] **Discount & Scholarship Logic**: Support for percentage-based or fixed-amount discounts per student.
- [x] **Payment Processing**: Transactional logic to record payments and update invoice statuses.

---

## 📋 Immediate Work Plan (UI & Feature Integration)

### Phase 1: Member Management (High Priority)
1.  **Manager Member-Review UI**: A dashboard for Managers to see all new registrants (`USER` role).
2.  **Role Assignment Workflow**: UI to trigger the `assignToStudent` or `assignToTeacher` actions, including ID generation.
3.  **Onboarding Experience**: Feedback/Success states for users waiting for approval.

### Phase 2: Financial & Student Dashboards
1.  **Student Financial View**: Dashboard showing due amounts, paid invoices, and payment history.
2.  **Admin/Manager Finance UI**: Dashboard to view total collections, outstanding dues, and configure fees.

### Phase 3: Public Presence
1.  **Home Page (Hero + Features)**: Modern landing page for the coaching center.
2.  **Teacher Directory**: Public-facing list of teachers with their descriptions and specializations.
3.  **Admission Call-to-Action**: Direct links for public registration.

---

## ⚠️ Important Technical Notes
- **Prisma 7 Requirement**: When running standalone scripts (like seeds), always ensure the `PrismaPg` adapter is used as configured in `src/lib/prisma.ts`.
- **Database Access**: We use a pooler for the app (`DATABASE_URL`) and a direct connection for migrations (`DIRECT_URL`) in `prisma.config.ts`.
- **RBAC**: Any new dashboard route must be added to the `matcher` in `src/middleware.ts`.

---

## 📅 Last Updated
**Date:** Wednesday, May 13, 2026
**Status:** Infrastructure Complete | Moving to Feature Implementation (Admission).
