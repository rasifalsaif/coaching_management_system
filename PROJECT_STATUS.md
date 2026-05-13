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

### 3. Auth & Authorization (RBAC)
- [x] Defined Roles: `ADMIN`, `MANAGER`, `TEACHER`, `STUDENT`.
- [x] Implemented **Middleware Protection**:
    - Automatic redirection to role-specific dashboards (e.g., `/dashboard/student`).
    - Granular route guarding (e.g., preventing students from accessing `/admin`).
- [x] Established **Dashboard Layouts**: Created route groups `(dashboard)/admin`, `(dashboard)/student`, etc.

---

## 🛠️ Current Status: "The Skeleton is Ready"
The system has its "brain" (Auth), "bones" (Database), and "nerves" (Middleware). It can recognize who is logged in and where they should go, but the individual feature pages are currently placeholders.

---

## 📋 Immediate Work Plan (Revised Onboarding Strategy)

### Phase 1: Public Onboarding & Role Assignment
1.  **Public Self-Registration**: Allow visitors to create accounts (Defaults to a `VISITOR` or `PENDING` role).
2.  **Manager Member-Review UI**: A dashboard for Managers to see all new registrants.
3.  **Role Assignment Action**: Manager selects a member and assigns them as either a `STUDENT` or `TEACHER`.
4.  **Profile Activation**: Upon role assignment, the relevant profile (Student/Teacher) is created/activated.

### Phase 2: Enhanced Profile Management
1.  **Self-Service Updates**: Users can update their own photos, bios, and passwords.
2.  **Teacher Customization**: Teachers can add their teaching descriptions and qualifications.

### Phase 3: Dashboard Features (Role-Specific)
- **Students**: Focus on Fee Tracking (Due/Paid), Results, and Exam Schedules.
- **Teachers**: Focus on Profile visibility on the public website.

---

## ⚠️ Important Technical Notes
- **Prisma 7 Requirement**: When running standalone scripts (like seeds), always ensure the `PrismaPg` adapter is used as configured in `src/lib/prisma.ts`.
- **Database Access**: We use a pooler for the app (`DATABASE_URL`) and a direct connection for migrations (`DIRECT_URL`) in `prisma.config.ts`.
- **RBAC**: Any new dashboard route must be added to the `matcher` in `src/middleware.ts`.

---

## 📅 Last Updated
**Date:** Wednesday, May 13, 2026
**Status:** Infrastructure Complete | Moving to Feature Implementation (Admission).
