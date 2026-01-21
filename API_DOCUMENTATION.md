# Product Management API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Default Admin Credentials
```
Email: oliviertechadmin@yopmail.com
Password: admin123
```

---

## 1. Authentication Endpoints

### 1.1 Register User
**POST** `/auth/register`

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "createdAt": "2024-01-20T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 1.2 Login
**POST** `/auth/login`

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "oliviertechadmin@yopmail.com",
    "password": "admin123"
  }'
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "6970c0b27061e2a95e064980",
      "email": "oliviertechadmin@yopmail.com",
      "firstName": "Olivier",
      "lastName": "Tech",
      "role": "ADMIN"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 2. Product Endpoints (Admin - Protected)

### 2.1 Create Product
**POST** `/products`
**Auth Required:** Yes (ADMIN)

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung Galaxy S24",
    "description": "Latest Samsung flagship with AI features and amazing camera",
    "shortDescription": "Premium Android smartphone",
    "price": 899.99,
    "compareAtPrice": 999.99,
    "stock": 75,
    "images": ["https://via.placeholder.com/400"],
    "thumbnail": "https://via.placeholder.com/200",
    "category": "Electronics",
    "tags": ["smartphone", "samsung", "android"],
    "isFeatured": true
  }'
```

**Request Body:**
```json
{
  "name": "iPhone 15 Pro",
  "description": "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
  "shortDescription": "Premium flagship smartphone",
  "price": 999.99,
  "compareAtPrice": 1099.99,
  "costPrice": 750.00,
  "stock": 50,
  "lowStockThreshold": 10,
  "images": [
    "https://example.com/iphone-front.jpg",
    "https://example.com/iphone-back.jpg"
  ],
  "thumbnail": "https://example.com/iphone-thumb.jpg",
  "category": "Electronics",
  "tags": ["smartphone", "apple", "5g", "featured"],
  "metaTitle": "iPhone 15 Pro - Buy Now",
  "metaDescription": "Get the latest iPhone 15 Pro with amazing features",
  "isFeatured": true
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "iPhone 15 Pro",
    "slug": "iphone-15-pro",
    "sku": "SKU-1705750800000",
    "description": "The latest iPhone...",
    "price": 999.99,
    "stock": 50,
    "status": "ACTIVE",
    "createdAt": "2024-01-20T10:00:00.000Z"
  }
}
```

### 2.2 Get All Products (Admin)
**GET** `/products`
**Auth Required:** Yes (ADMIN)

**cURL Example:**
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=10&search=samsung&category=Electronics" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `search` (string) - Search in name/description
- `category` (string)
- `status` (ACTIVE | INACTIVE | OUT_OF_STOCK | DISCONTINUED)
- `minPrice` (number)
- `maxPrice` (number)
- `isFeatured` (boolean)

**Example:**
```
GET /products?page=1&limit=10&search=iphone&category=Electronics&minPrice=500&maxPrice=1500
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "iPhone 15 Pro",
      "slug": "iphone-15-pro",
      "price": 999.99,
      "stock": 50,
      "status": "ACTIVE",
      "isFeatured": true
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

### 2.3 Get Product by ID
**GET** `/products/:id`
**Auth Required:** Yes (ADMIN)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "iPhone 15 Pro",
    "slug": "iphone-15-pro",
    "sku": "SKU-1705750800000",
    "description": "The latest iPhone...",
    "shortDescription": "Premium flagship smartphone",
    "price": 999.99,
    "compareAtPrice": 1099.99,
    "costPrice": 750.00,
    "stock": 50,
    "lowStockThreshold": 10,
    "images": ["https://example.com/image1.jpg"],
    "thumbnail": "https://example.com/thumb.jpg",
    "category": "Electronics",
    "tags": ["smartphone", "apple"],
    "status": "ACTIVE",
    "isFeatured": true,
    "viewCount": 150,
    "purchaseCount": 25,
    "createdAt": "2024-01-20T10:00:00.000Z",
    "updatedAt": "2024-01-20T10:00:00.000Z"
  }
}
```

### 2.4 Update Product
**PATCH** `/products/:id`
**Auth Required:** Yes (ADMIN)

**cURL Example:**
```bash
curl -X PATCH http://localhost:3000/api/products/6970c2788f9351bb35227f7c \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 849.99,
    "stock": 80,
    "status": "ACTIVE"
  }'
```

**Request Body (all fields optional):**
```json
{
  "name": "iPhone 15 Pro Max",
  "price": 1099.99,
  "stock": 45,
  "status": "ACTIVE",
  "isFeatured": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "iPhone 15 Pro Max",
    "price": 1099.99,
    "stock": 45,
    "updatedAt": "2024-01-20T11:00:00.000Z"
  }
}
```

### 2.5 Delete Product
**DELETE** `/products/:id`
**Auth Required:** Yes (ADMIN)

**cURL Example:**
```bash
curl -X DELETE http://localhost:3000/api/products/6970c2788f9351bb35227f7c \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 3. Public Product Endpoints (No Auth Required)

### 3.1 Get Active Products
**GET** `/products/public`
**Auth Required:** No

**cURL Example:**
```bash
curl -X GET "http://localhost:3000/api/products/public?page=1&limit=10&search=iphone&category=Electronics&minPrice=500&maxPrice=1500"
```

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `search` (string)
- `category` (string)
- `minPrice` (number)
- `maxPrice` (number)

**Example:**
```
GET /products/public?page=1&limit=10&search=phone&category=Electronics
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "iPhone 15 Pro",
      "slug": "iphone-15-pro",
      "shortDescription": "Premium flagship smartphone",
      "price": 999.99,
      "compareAtPrice": 1099.99,
      "stock": 50,
      "images": ["https://example.com/image1.jpg"],
      "thumbnail": "https://example.com/thumb.jpg",
      "category": "Electronics",
      "tags": ["smartphone", "apple"],
      "isFeatured": true,
      "viewCount": 150,
      "createdAt": "2024-01-20T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 15,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

### 3.2 Get Product by Slug
**GET** `/products/public/slug/:slug`
**Auth Required:** No

**cURL Example:**
```bash
curl -X GET http://localhost:3000/api/products/public/slug/iphone-15-pro
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "iPhone 15 Pro",
    "slug": "iphone-15-pro",
    "description": "The latest iPhone...",
    "price": 999.99,
    "stock": 50,
    "images": ["https://example.com/image1.jpg"],
    "category": "Electronics",
    "viewCount": 151
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Forbidden: Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Notes

1. **Auto-generated Fields:**
   - `slug` is auto-generated from product name
   - `sku` is auto-generated if not provided
   - `viewCount` increments on each product view

2. **Product Status:**
   - Only `ACTIVE` products appear in public endpoints
   - Admin can see all products regardless of status

3. **Images:**
   - Store image URLs as strings in an array
   - No file upload handling (use external storage like AWS S3, Cloudinary)

4. **First User:**
   - First registered user should be manually changed to ADMIN role in database
   - Or create a seed script to create admin user
