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

---

## 📋 Immediate Work Plan (The Financial Engine)

### Phase 1: Billing & Fee Engine (Current)
1.  **Fee Configuration**: Logic to define base prices for Groups (Full Package) vs. Individual Subjects.
2.  **Monthly Billing Logic**: A service to generate "Due" records (Invoices) for all active students every month.
3.  **Discount & Scholarship Logic**: Support for percentage-based or fixed-amount discounts per student.
4.  **Due Tracking**: Service to calculate "Total Overdue" for student dashboards.

### Phase 2: User Interface (Dashboards)
1.  **Manager Member-Review UI**: Review and assign roles to new public visitors.
2.  **Student Financial Dashboard**: View paid/unpaid invoices and total dues.
3.  **Teacher Public Showcase**: The public home page components pulling from teacher profiles.

---

## ⚠️ Important Technical Notes
- **Prisma 7 Requirement**: When running standalone scripts (like seeds), always ensure the `PrismaPg` adapter is used as configured in `src/lib/prisma.ts`.
- **Database Access**: We use a pooler for the app (`DATABASE_URL`) and a direct connection for migrations (`DIRECT_URL`) in `prisma.config.ts`.
- **RBAC**: Any new dashboard route must be added to the `matcher` in `src/middleware.ts`.

---

## 📅 Last Updated
**Date:** Wednesday, May 13, 2026
**Status:** Infrastructure Complete | Moving to Feature Implementation (Admission).
