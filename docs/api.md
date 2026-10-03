# REST API Specification

## Common Response Format
```json
{
  "success": true,
  "message": "Operation response message",
  "data": {}
}
```

## Core Endpoints Overview
- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - User login (Returns JWT token)
- `GET /api/auth/me` - Fetch authenticated user profile
- `GET /api/menu` - Fetch menu items (Supports category, search, availability filters)
- `POST /api/orders` - Place a new order with atomic transaction
- `GET /api/orders` - User order history
- `GET /api/admin/orders` - Admin order management
- `PUT /api/admin/orders/:id/status` - Update order lifecycle status
