# CCMS - Coaching Center Management System

A high-performance, full-stack management solution tailored for Bangladeshi coaching centers. Built with modern web technologies to handle identity, academics, and automated financial tracking.

## 🚀 Key Features

### 1. Identity & Role-Based Access (RBAC)
- **Multi-Role Support**: Distinct workflows for `ADMIN`, `MANAGER`, `TEACHER`, `STUDENT`, and `USER` (Public/Pending).
- **Secure Authentication**: Powered by Better Auth with session-based security and middleware protection.
- **Dynamic Dashboards**: Each role has a custom dashboard with relevant stats and quick actions.

### 2. Academic Management
- **Catalog Management**: Groups (Science, Commerce, Arts) and Subjects organization.
- **Batch System**: Create and manage batches with scheduling (Time, Days) and teacher assignments.
- **Enrollment**: Streamlined process for enrolling students into specific batches.
- **Attendance Tracking**: Digital attendance recording for student batches.
- **Result Management**: Exam creation and mark entry system for tracking student performance.
- **Notice Board**: Real-time announcement system with global and role-specific visibility.

### 3. Financial Engine
- **Automated Billing**: Logic for monthly "Due" generation based on base fees (Group or Subject level).
- **Custom Pricing**: Ability for managers to set specific fee overrides for individual students.
- **Payment Tracking**: Offline payment recording (Cash, bKash, etc.) with instant student ledger updates.
- **Invoicing**: Automatic generation of monthly invoices and payment receipts.

### 4. Profile & Member Management
- **Registration Workflow**: Public registration for new users, followed by manager review and role assignment.
- **ID Generation**: Automated, formatted ID generation for students and teachers (e.g., STU-2026-001).
- **Profile Customization**: Self-service profile updates for bio, photos, and professional details.

### 5. Public Presence
- **Modern Landing Page**: High-conversion hero section and feature showcase.
- **Teacher Directory**: Dynamic public-facing teacher profiles pulled from the database.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Prisma 7](https://www.prisma.io/)
- **Auth**: [Better Auth](https://better-auth.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
src/
├── app/             # Next.js App Router (Pages, Layouts, API)
├── components/      # Shared & Layout UI components
├── features/        # Feature-based modular logic (Actions, Components, Services)
│   ├── academic/    # Batches, Subjects, Enrollments
│   ├── admin/       # Registration review, Finance config
│   ├── attendance/  # Attendance management
│   ├── auth/        # Login/Register forms, Profile logic
│   ├── finance/     # Billing and payment logic
│   ├── notices/     # Notice board feature
│   ├── results/     # Exam and mark management
│   └── students/    # Student-specific dashboard features
├── lib/             # Core configurations (Prisma, Auth, Utils)
└── styles/          # Global CSS and Tailwind config
```

---

## 🚦 Getting Started

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Environment Setup**: Copy `.env.example` to `.env` and fill in your database and auth credentials.
4. **Database Sync**: `npx prisma db push`
5. **Run Development Server**: `npm run dev`

---

## 📅 Roadmap & Status
Current Status: **Core Features Operational**. Moving towards Phase 5 (Advanced Reporting & Mobile Optimization). 
See `PROJECT_STATUS.md` for detailed progress tracking.
