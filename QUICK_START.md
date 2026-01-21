# Quick Start Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Update `.env` file with your MongoDB connection:
```env
DATABASE_URL="mongodb://localhost:27017/product_management"
JWT_SECRET=your-secret-key-here
```

### 3. Setup Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# Seed database with admin user and sample products
npm run seed
```

### 4. Start Server
```bash
npm run dev
```

Server runs on: `http://localhost:5000`

## Default Admin Credentials
```
Email: admin@example.com
Password: admin123
```

⚠️ **Change these credentials in production!**

## Test the API

### 1. Login as Admin
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Copy the `token` from response.

### 2. Get All Products (Admin)
```bash
curl http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 3. Get Public Products (No Auth)
```bash
curl http://localhost:5000/api/products/public
```

### 4. Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test product description",
    "price": 99.99,
    "stock": 10,
    "category": "Test",
    "tags": ["test"]
  }'
```

## Project Structure
```
src/
├── config/         # Logger configuration
├── controllers/    # Request handlers
├── lib/           # Prisma client
├── middlewares/   # Auth & error handling
├── routes/        # API routes
├── services/      # Business logic
├── utils/         # Utilities
├── validators/    # Zod schemas
├── app.ts         # Express app
└── server.ts      # Entry point
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database
- `npm run prisma:studio` - Open Prisma Studio

## API Endpoints

### Public (No Auth)
- `GET /api/products/public` - Get active products
- `GET /api/products/public/slug/:slug` - Get product by slug

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Products (Admin Only)
- `POST /api/products` - Create product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## Next Steps
1. Change admin password
2. Add your products
3. Integrate with frontend
4. Deploy to production

## Support
For detailed API documentation, see `API_DOCUMENTATION.md`
