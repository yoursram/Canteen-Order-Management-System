# System Architecture & Technical Specifications

## Architectural Overview
The system follows a modern decoupled Client-Server RESTful architecture.

```
┌───────────────────────────────────────┐
│     React + Vite Frontend (Client)    │
│  - React Router DOM  - Context API    │
│  - Tailwind CSS      - Axios          │
└──────────────────┬────────────────────┘
                   │ HTTP / REST APIs (JSON)
                   ▼
┌───────────────────────────────────────┐
│      Node.js + Express Backend        │
│  - Controllers  - Services - Models   │
│  - JWT Middleware  - Express Validator│
└──────────────────┬────────────────────┘
                   │ mysql2 Connection Pool
                   ▼
┌───────────────────────────────────────┐
│           MySQL Database              │
│  - users        - categories          │
│  - menu_items   - orders              │
│  - order_items  - payments            │
└───────────────────────────────────────┘
```

## Modular Layer Responsibility
1. **Controllers:** Handle HTTP request validation, extract parameters, invoke services, and structure API responses.
2. **Services:** Perform business logic, manage transactions, and orchestrate database models.
3. **Models:** Execute parameterized SQL queries against MySQL connection pool.
4. **Middleware:** Intercept requests for JWT Authentication, Role Verification (ADMIN / CUSTOMER), and global Error Handling.
