# Product Management System Backend

A robust Product Management System backend built with Node.js, Express, MongoDB, and Prisma. Powers the  Product Store with authentication, CRUD operations, and real-time statistics.

## Live Demo

- **Backend API**: https://productstore-bn.onrender.com/api
- **Frontend**: https://productstore-fn.vercel.app/
- **Repository**: https://github.com/oliviertech212/Productstore_bn

## Demo Admin Credentials

```
Email: oliviertechadmin@yopmail.com
Password: admin123
```

## Features

- User Authentication (Register/Login with JWT)
- Product CRUD Operations (Admin only)
- Public API for Active Products
- Advanced Search & Filters
- Pagination Support
- Product Images (Array of URLs)
- Stock Management
- Featured Products
- SEO Fields (Meta Title, Meta Description)
- View Count Tracking
- Real-time Statistics

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Logging**: Winston
- **Deployment**: Render.com

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

```bash
git clone https://github.com/oliviertech212/Productstore_bn.git
cd Productstore_bn
npm install
```

### Environment Setup
```bash
cp .env.example .env
```

Update `.env`:
```env
DATABASE_URL="mongodb://localhost:27017/product_management"
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

### Database Setup
```bash
npm run prisma:generate
npm run prisma:push
```

### Start Development
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "oliviertechadmin@yopmail.com",
  "password": "admin123"
}
```

### Products (Admin - Protected)

#### Create Product
```http
POST /api/products
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone with advanced features",
  "shortDescription": "Premium smartphone",
  "price": 999.99,
  "compareAtPrice": 1099.99,
  "stock": 50,
  "images": ["https://example.com/image1.jpg"],
  "thumbnail": "https://example.com/thumbnail.jpg",
  "category": "Electronics",
  "tags": ["smartphone", "apple", "featured"],
  "isFeatured": true
}
```

#### Get All Products (Admin)
```http
GET /api/products?page=1&limit=10&search=iphone&category=Electronics
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update Product
```http
PUT /api/products/:id
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "price": 899.99,
  "stock": 45,
  "status": "ACTIVE"
}
```

#### Delete Product
```http
DELETE /api/products/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

### Products (Public)

#### Get Active Products
```http
GET /api/products/public?page=1&limit=10&search=phone
```

## Query Parameters

### Search & Filter
- `search` - Search in name and description
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `status` - Filter by status
- `isFeatured` - Filter featured products

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Product Status

- `ACTIVE` - Available for purchase
- `INACTIVE` - Hidden from public
- `OUT_OF_STOCK` - Temporarily unavailable
- `DISCONTINUED` - No longer available

## User Roles

- `ADMIN` - Full access to all endpoints
- `USER` - Can only view public products

## Database Schema

### User Model
- id, email, password, firstName, lastName
- role (ADMIN/USER)
- isActive, createdAt, updatedAt

### Product Model
- id, name, slug, sku
- description, shortDescription
- price, compareAtPrice, costPrice
- stock, lowStockThreshold
- images (array), thumbnail
- category, tags (array)
- metaTitle, metaDescription
- status, isFeatured
- viewCount, purchaseCount
- createdAt, updatedAt

## Deployment

**Live on Render**: https://productstore-bn.onrender.com/api

### Build Commands
```bash
npm run build
npm run prisma:generate
npm run prisma:push
npm start
```

## Development

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production
npm start

# Prisma Studio
npm run prisma:studio
```

## Project Structure

```
product-management-system/
├── src/
│   ├── config/          # Configuration
│   ├── controllers/     # Request handlers
│   ├── lib/            # Prisma client
│   ├── middlewares/    # Auth, error handling
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utilities
│   ├── validators/     # Zod schemas
│   ├── app.ts          # Express app
│   └── server.ts       # Entry point
├── prisma/
│   └── schema.prisma   # Database schema
└── package.json
```

---

**Built with ❤️ by OlivierTech**