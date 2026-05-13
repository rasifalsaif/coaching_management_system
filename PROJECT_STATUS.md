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

## 📋 Immediate Work Plan (The Next Steps)

### Phase 1: Student Admission & Approval (High Priority)
1.  **Public Registration Page**: Create a clean, responsive form for new students to apply.
2.  **Manager Approval Dashboard**: Build the UI for Managers to view `PENDING` students and "Accept" them (setting status to `ACTIVE`).
3.  **Student ID Generation**: Implement logic to assign professional IDs (e.g., `STU-2026-001`) upon approval.

### Phase 2: Academic Setup (Batches & Schedules)
1.  **Batch Management**: Admin UI to create Batches (e.g., "HSC 2026 - Batch A") and assign them to Subjects and Teachers.
2.  **Enrollment Engine**: Logic to enroll a student in a "Full Group Package" vs. "Individual Subjects."

### Phase 3: Billing & Finance
1.  **Fee Definition**: Set prices for Groups vs. Individual Subjects.
2.  **Monthly Invoice Generation**: Automated logic to create "Monthly Due" records for all active students.
3.  **Payment Collection**: Manager UI to record cash payments and issue digital receipts.

---

## ⚠️ Important Technical Notes
- **Prisma 7 Requirement**: When running standalone scripts (like seeds), always ensure the `PrismaPg` adapter is used as configured in `src/lib/prisma.ts`.
- **Database Access**: We use a pooler for the app (`DATABASE_URL`) and a direct connection for migrations (`DIRECT_URL`) in `prisma.config.ts`.
- **RBAC**: Any new dashboard route must be added to the `matcher` in `src/middleware.ts`.

---

## 📅 Last Updated
**Date:** Wednesday, May 13, 2026
**Status:** Infrastructure Complete | Moving to Feature Implementation (Admission).
