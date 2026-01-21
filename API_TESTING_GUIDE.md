# API Testing Guide - cURL Commands

## Prerequisites
- Server running on `http://localhost:3000`
- Admin credentials: `oliviertechadmin@yopmail.com` / `admin123`

---

## 1. Authentication

### Login as Admin
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "oliviertechadmin@yopmail.com",
    "password": "admin123"
  }'
```

**Save the token from response for next requests!**

### Register New User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

## 2. Products (Admin - Protected)

**Replace `YOUR_TOKEN` with the token from login response**

### Create Product
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

### Get All Products (Admin)
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get All Products with Filters
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=10&search=samsung&category=Electronics&minPrice=500&maxPrice=1500&isFeatured=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Product by ID
```bash
curl -X GET http://localhost:3000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Product
```bash
curl -X PATCH http://localhost:3000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 849.99,
    "stock": 80,
    "status": "ACTIVE"
  }'
```

### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 3. Products (Public - No Auth)

### Get Active Products
```bash
curl -X GET "http://localhost:3000/api/products/public?page=1&limit=10"
```

### Get Active Products with Search
```bash
curl -X GET "http://localhost:3000/api/products/public?page=1&limit=10&search=iphone&category=Electronics"
```

### Get Active Products with Price Filter
```bash
curl -X GET "http://localhost:3000/api/products/public?page=1&limit=10&minPrice=500&maxPrice=1500"
```

### Get Product by Slug
```bash
curl -X GET http://localhost:3000/api/products/public/slug/iphone-15-pro
```

---

## 4. Complete Testing Flow

### Step 1: Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "oliviertechadmin@yopmail.com",
    "password": "admin123"
  }'
```

Copy the token from response.

### Step 2: Create a Product
```bash
TOKEN="YOUR_TOKEN_HERE"

curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "description": "This is a test product with detailed description",
    "shortDescription": "Test product",
    "price": 199.99,
    "stock": 50,
    "category": "Test Category",
    "tags": ["test", "demo"]
  }'
```

Copy the product ID from response.

### Step 3: Get All Products
```bash
curl -X GET "http://localhost:3000/api/products?page=1&limit=10" \
  -H "Authorization: Bearer $TOKEN"
```

### Step 4: Update the Product
```bash
PRODUCT_ID="YOUR_PRODUCT_ID"

curl -X PATCH http://localhost:3000/api/products/$PRODUCT_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 179.99,
    "stock": 45
  }'
```

### Step 5: Get Product by ID
```bash
curl -X GET http://localhost:3000/api/products/$PRODUCT_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Step 6: Test Public API (No Auth)
```bash
curl -X GET "http://localhost:3000/api/products/public?page=1&limit=10"
```

### Step 7: Delete the Product
```bash
curl -X DELETE http://localhost:3000/api/products/$PRODUCT_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## 5. Testing Different Scenarios

### Test Search Functionality
```bash
# Search by name
curl -X GET "http://localhost:3000/api/products/public?search=iphone"

# Search by category
curl -X GET "http://localhost:3000/api/products/public?category=Electronics"

# Combined search
curl -X GET "http://localhost:3000/api/products/public?search=pro&category=Electronics"
```

### Test Price Filters
```bash
# Products under $1000
curl -X GET "http://localhost:3000/api/products/public?maxPrice=1000"

# Products between $500-$1500
curl -X GET "http://localhost:3000/api/products/public?minPrice=500&maxPrice=1500"
```

### Test Pagination
```bash
# First page
curl -X GET "http://localhost:3000/api/products/public?page=1&limit=2"

# Second page
curl -X GET "http://localhost:3000/api/products/public?page=2&limit=2"
```

### Test Featured Products
```bash
curl -X GET "http://localhost:3000/api/products/public?isFeatured=true"
```

---

## 6. Error Testing

### Test Invalid Token
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer invalid_token"
```

### Test Missing Token
```bash
curl -X GET http://localhost:3000/api/products
```

### Test Invalid Product ID
```bash
curl -X GET http://localhost:3000/api/products/invalid_id \
  -H "Authorization: Bearer $TOKEN"
```

### Test Invalid Data
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "AB",
    "price": -100
  }'
```

---

## 7. Useful Tips

### Pretty Print JSON Response
```bash
curl -X GET http://localhost:3000/api/products/public | jq
```

### Save Response to File
```bash
curl -X GET http://localhost:3000/api/products/public > response.json
```

### Show Response Headers
```bash
curl -i -X GET http://localhost:3000/api/products/public
```

### Verbose Output
```bash
curl -v -X GET http://localhost:3000/api/products/public
```

---

## Expected Responses

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

---

## Quick Reference

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/login` | POST | No | Login user |
| `/api/auth/register` | POST | No | Register user |
| `/api/products` | POST | Yes | Create product |
| `/api/products` | GET | Yes | Get all products (admin) |
| `/api/products/:id` | GET | Yes | Get product by ID |
| `/api/products/:id` | PATCH | Yes | Update product |
| `/api/products/:id` | DELETE | Yes | Delete product |
| `/api/products/public` | GET | No | Get active products |
| `/api/products/public/slug/:slug` | GET | No | Get product by slug |

---

## Notes

1. All timestamps are in ISO 8601 format
2. Product slugs are auto-generated from names
3. SKUs are auto-generated if not provided
4. Only ACTIVE products appear in public endpoints
5. Admin can see all products regardless of status
6. View count increments on each product view
