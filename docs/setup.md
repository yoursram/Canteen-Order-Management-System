# Development & Setup Instructions

## Prerequisites
- Node.js (v18+)
- MySQL Server (v8.0+)
- npm or pnpm package manager

## Quick Start
1. Clone / Navigate to workspace root: `college-canteen-management/`
2. Backend Installation:
   ```bash
   cd server
   npm install
   ```
3. Frontend Installation:
   ```bash
   cd client
   npm install
   ```
4. Database Setup:
   - Import `database/schema.sql` into MySQL
   - Configure `server/.env` with database credentials
   - Run database seed script: `npm run seed` inside `server/`
5. Start Development Servers:
   - Backend: `npm run dev` (Runs on port 5000)
   - Frontend: `npm run dev` (Runs on port 5173)
