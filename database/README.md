# Database Setup & Scripts

## MySQL Initialization
Execute the following commands in MySQL Workbench or MySQL CLI:
```bash
mysql -u root -p < database/schema.sql
```

## Seeding Strategy
Database initial seed data is stored in standard JSON files under `server/data/` for easy development setup. Run the Node.js database seeder script to populate:
```bash
cd server
npm run seed
```
