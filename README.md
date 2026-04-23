# Learning Management System

## Overview
A full-stack Learning Management System with separate admin and student portals. Admins manage student registrations through a step-based workflow, manage courses with video content, and track payments. Students access enrolled courses after approval.

---

## Features

### Admin Features
- Dashboard with enrollment statistics and quick actions
- Create new student registrations via multi-step form
- Manage registration lifecycle: Draft -> Pending -> Approved/Rejected
- View complete student details (courses, payment, documents)
- Approve or reject registrations
- Generate student credentials on approval (email + auto-generated password)
- Manage courses with modules and videos (YouTube URLs)
- Track and update payment records
- View and manage student documents

### Student Features
- Login using admin-generated credentials
- View enrolled courses and progress
- Watch course videos (embedded via YouTube)
- Track completion progress (70% videos + 30% watch time)
- View profile details

---

## Project Flow (End-to-End)

1. **Admin Login** - Access admin portal at `/admin`
2. **Initiate Registration** - Admin starts student registration process
3. **Multi-Step Form** - Complete 8 steps:
   - Step 1: Select courses
   - Step 2: Basic details (name, email)
   - Step 3: Contact information (phone)
   - Step 4: Address details
   - Step 5: Education details
   - Step 6: Health information
   - Step 7: Payment details
   - Step 8: Review and submit
4. **Draft State** - Progress auto-saved; status = `draft`
5. **Submit** - On final submit, status changes to `pending`
6. **Admin Review** - Admin reviews registration details
7. **Payment Verification** - System validates payment status = `completed` before approval
8. **Approval** - Admin approves:
   - Student credentials generated (email + 8-char random password)
   - User account created with role = `student`
   - SMS notification sent (if MSG91 configured)
9. **Student Login** - Student accesses portal with credentials
10. **Course Access** - Student views enrolled courses and videos

---

## System Flow Diagram

```
Admin Portal                           System                      Student Portal
---------                              ------                      -------------
| Login |                               |                            |
   |                                    |                            |
   |--- Create Student ----------------->|                           |
   |                                    |                            |
   |<--- Registration ID (Draft) -------|<---- Step 1-8 Form ------->|
   |                                    |                            |
   |--- Submit Form -------------------->|                           |
   |                                    |                            |
   |<--- Status: Pending --------------->|                           |
   |                                    |                            |
   |--- Review Details ----------------->|                           |
   |                                    |                            |
   |--- [Approve] --------------------->|                            |
   |     (payment must be completed)     |                            |
   |                                    |                            |
   |                                    |-- Generate Credentials --->|
   |                                    |                            |
   |<--- Email + Password --------------|<--- Login Credentials ----|
   |                                    |                            |
   |                                    |                            |
   |                                    |---- Enrolled Courses ----->|
   |                                    |                            |
   |                                    |<--- Watch Videos ---------|
   |                                    |                            |
   |--- View Progress ----------------->|                            |
```

### Registration Status Flow

```
[Start] --> [Draft] --> [Pending] --> [Approved] --> [Active Student]
                           |
                           +--> [Rejected] --> [Edit] --> [Pending]
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Backend | Fastify, Node.js, TypeScript |
| Database | MongoDB |
| Authentication | JWT (@fastify/jwt) |
| File Storage | @fastify/multipart (10MB limit) |
| Notifications | MSG91 (SMS) |
| Rate Limiting | @fastify/rate-limit |

---

## Project Structure

```
/Learning-Management-System
|-- backend/
|   |-- src/
|   |   |-- routes/        # API endpoints (auth, courses, registration, payments, etc.)
|   |   |-- services/      # Notification service (SMS/WhatsApp)
|   |   |-- db/            # MongoDB connection
|   |   |-- scripts/      # Admin setup script
|   |   |-- types/         # TypeScript type definitions
|   |   |-- utils/         # Response helpers, error handling
|   |   |-- config/        # Rate limiting config
|   |   |-- index.ts       # Entry point
|   |-- uploads/           # Uploaded documents
|   |-- package.json
|   |-- tsconfig.json
|-- frontend/
|   |-- src/
|   |   |-- app/           # Next.js pages (admin/, student/, login/)
|   |   |-- components/    # Reusable UI components
|   |   |-- lib/           # API client, auth context, utilities
|   |   |-- hooks/         # Custom React hooks
|   |-- package.json
|   |-- tsconfig.json
|-- README.md
|-- .gitignore
```

---

## Setup Instructions

### 1. Clone Repository
```bash
git clone <repository-url>
cd Learning-Management-System
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment Variables

**Backend** (`backend/.env`):
```env
PORT=3001
MONGODB_URI=<mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
MSG91_API_KEY=<your-msg91-api-key>
MSG91_SENDER_ID=<your-sender-id>
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Run Project
```bash
# Terminal 1 - Backend (port 3001)
cd backend
npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend
npm run dev
```

### 5. Setup Admin Account
```bash
cd backend
npm run setup
```
This creates the initial admin user.

---

## Important Notes

- **Credentials** are generated only after admin approval (not on registration start)
- **Password** is auto-generated: 8-character random string stored as bcrypt hash
- **Payment Required** - Registrations cannot be approved unless payment status is `completed`
- **SMS/Notifications** - MSG91 integration exists but requires valid API keys to function; SMS is skipped if keys are missing
- **Video Hosting** - Videos are embedded via YouTube URLs (no direct video file storage)
- **Rate Limiting** - API endpoints are limited to 100 requests per minute per IP
- **File Uploads** - Maximum file size is 10MB per upload