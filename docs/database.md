# Database Architecture & Schema Design

## Database Name
`college_canteen`

## Entity-Relationship Summary
- **users:** Stores student & canteen admin profiles.
- **categories:** Food categories (Breakfast, Meals, Beverages, Combos, etc.).
- **menu_items:** Specific dishes offered with prices, preparation time, and availability status.
- **orders:** Master order table tracking subtotal, tax, total, payment status, order status, and pickup location.
- **order_items:** Line items attached to orders.
- **payments:** Payment logs detailing method, transaction ID, and status.

## Foreign Key Relationships & Cascades
- `menu_items.category_id` -> `categories.id` (ON DELETE SET NULL)
- `orders.user_id` -> `users.id` (ON DELETE CASCADE)
- `order_items.order_id` -> `orders.id` (ON DELETE CASCADE)
- `order_items.menu_item_id` -> `menu_items.id` (ON DELETE RESTRICT)
- `payments.order_id` -> `orders.id` (ON DELETE CASCADE)
