# Product Management System

A simple and powerful Product Management System built with Node.js, Express, MongoDB, and Prisma.

## Features

- ✅ User Authentication (Register/Login with JWT)
- ✅ Product CRUD Operations (Admin only)
- ✅ Public API for Active Products
- ✅ Advanced Search & Filters
- ✅ Pagination Support
- ✅ Product Images (Array of URLs)
- ✅ Stock Management
- ✅ Featured Products
- ✅ SEO Fields (Meta Title, Meta Description)
- ✅ View Count Tracking

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Logging**: Winston

## Installation

1. **Clone the repository**
```bash
cd product-management-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and update:
```env
DATABASE_URL="mongodb://localhost:27017/product_management"
JWT_SECRET=your-super-secret-jwt-key
```

4. **Generate Prisma Client**
```bash
npm run prisma:generate
```

5. **Push database schema**
```bash
npm run prisma:push
```

6. **Start development server**
```bash
npm run dev
```

Server will run on `http://localhost:5000`

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
  "email": "admin@example.com",
  "password": "password123"
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
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "thumbnail": "https://example.com/thumbnail.jpg",
  "category": "Electronics",
  "tags": ["smartphone", "apple", "featured"],
  "isFeatured": true
}
```

#### Get All Products (Admin)
```http
GET /api/products?page=1&limit=10&search=iphone&category=Electronics&minPrice=500&maxPrice=1500
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get Product by ID (Admin)
```http
GET /api/products/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Update Product
```http
PATCH /api/products/:id
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

### Products (Public - No Auth Required)

#### Get Active Products
```http
GET /api/products/public?page=1&limit=10&search=phone&category=Electronics&minPrice=100&maxPrice=2000
```

#### Get Product by Slug
```http
GET /api/products/public/slug/iphone-15-pro
```

## Query Parameters

### Search & Filter
- `search` - Search in name and description
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `status` - Filter by status (ACTIVE, INACTIVE, OUT_OF_STOCK, DISCONTINUED)
- `isFeatured` - Filter featured products (true/false)

### Pagination
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

## Product Status

- `ACTIVE` - Product is available for purchase
- `INACTIVE` - Product is hidden from public
- `OUT_OF_STOCK` - Product is temporarily unavailable
- `DISCONTINUED` - Product is no longer available

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

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Open Prisma Studio
npm run prisma:studio
```

## Deployment

1. Set environment variables on your hosting platform
2. Run `npm run build`
3. Run `npm run prisma:generate`
4. Run `npm run prisma:push`
5. Run `npm start`

## Project Structure

```
product-management-system/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── lib/            # Prisma client
│   ├── middlewares/    # Auth, error handling
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   ├── validators/     # Zod schemas
│   ├── app.ts          # Express app
│   └── server.ts       # Server entry point
├── prisma/
│   └── schema.prisma   # Database schema
├── logs/               # Application logs
├── uploads/            # File uploads
└── package.json
```

## License

MIT
