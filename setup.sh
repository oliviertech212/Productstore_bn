#!/bin/bash

echo "🚀 Setting up Product Management System..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npm run prisma:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated"
echo ""

# Push database schema
echo "🗄️  Pushing database schema..."
npm run prisma:push

if [ $? -ne 0 ]; then
    echo "❌ Failed to push database schema"
    echo "⚠️  Make sure MongoDB is running and DATABASE_URL in .env is correct"
    exit 1
fi

echo "✅ Database schema pushed"
echo ""

# Seed database
echo "🌱 Seeding database..."
npm run seed

if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi

echo "✅ Database seeded"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "📝 Default Admin Credentials:"
echo "   Email: admin@example.com"
echo "   Password: admin123"
echo ""
echo "🚀 Start the server with: npm run dev"
echo ""
