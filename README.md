# College Canteen Order Management System

A production-style full-stack digital food ordering application for **Vidya Jyothi Institute of Technology (VJIT)** canteen.

## Project Overview
This system digitizes food ordering across campus canteens (Main Canteen, Hostel Canteen, Food Court), enabling students to browse menus, customize cart items, make simulated payments, and track order progress in real-time while providing administrators with sales statistics, menu controls, and order fulfillment tools.

## Tech Stack
- **Frontend:** React 18, Vite, Tailwind CSS, React Router DOM, Context API, Axios
- **Backend:** Node.js, Express.js, JWT, bcrypt, express-validator
- **Database:** MySQL (mysql2 with connection pooling)

## Directory Structure
```
college-canteen-management/
├── client/          # Vite + React Frontend
├── server/          # Node.js + Express REST API Backend
├── database/        # SQL Schemas and DB Documentation
├── docs/            # Architecture & API Specifications
└── README.md
```

## Deploying to Vercel

The repository-root `vercel.json` defines a Vite `client` service and an
Express `server` service. Requests to `/api/*` are routed to the server; all
other paths are served by the client. Configure the server's MySQL connection
variables (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME`) and
`JWT_SECRET` in the Vercel project's environment settings. The database must
be reachable from Vercel.
