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
- [x] **Individual Fee Overrides**: Manager can now set a custom monthly fee for any specific student.
- [x] **Monthly Billing Logic**: Service to generate "Due" records (Invoices) for all active students.
- [x] **Offline Payment System**: Manager UI to record cash/manual payments with instant student dashboard sync.

---

## 📋 Immediate Work Plan (UI & Feature Integration)

### Phase 1: Member Management
- [x] **Manager Member-Review UI**: A dashboard for Managers to see all new registrants (`USER` role).
- [x] **Role Assignment Workflow**: UI to trigger the `assignToStudent` or `assignToTeacher` actions, including ID generation.
- [x] **Custom Pricing**: Manager can set specific fees during or after the admission process.

### Phase 2: Financial & Student Dashboards
- [x] **Student Financial View**: Dashboard showing due amounts, paid invoices, and payment history.
- [x] **Admin/Manager Finance UI**: Dashboard to view and configure base fees for Groups and Subjects.
- [x] **Batch-Level Scheduling**: Support for group-wide batches (e.g., "Science Batch A") or subject-specific ones.

### Phase 3: Public Presence
- [x] **Home Page (Hero + Features)**: Modern landing page for the coaching center.
- [x] **Teacher Directory/Showcase**: Dynamic public-facing section pulling from the database.
- [x] **Admission Call-to-Action**: Direct links and integrated UI for public registration.

---

## 📋 Immediate Work Plan (Next Steps)

### Phase 4: Academic Management & Features
- [x] **Batch & Enrollment UI**: Manager tool to create batches and enroll students.
- [x] **Manager Attendance UI**: Tool for managers to record absences for any batch.
- [x] **Manager Result UI**: Tool for managers to create exams and input student marks.
- [ ] **Notice Board**: Real-time announcement system for teachers and students.

---

## ⚠️ Important Technical Notes
- **Prisma 7 Requirement**: When running standalone scripts (like seeds), always ensure the `PrismaPg` adapter is used as configured in `src/lib/prisma.ts`.
- **Database Access**: We use a pooler for the app (`DATABASE_URL`) and a direct connection for migrations (`DIRECT_URL`) in `prisma.config.ts`.
- **RBAC**: Any new dashboard route must be added to the `matcher` in `src/middleware.ts`.

---

## 📅 Last Updated
**Date:** Wednesday, May 13, 2026
**Status:** Infrastructure Complete | Moving to Feature Implementation (Admission).
