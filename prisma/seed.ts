import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');


  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'oliviertechadmin@yopmail.com' },
    update: {},
    create: {
      email: 'oliviertechadmin@yopmail.com',
      password: hashedPassword,
      firstName: 'Olivier',
      lastName: 'Tech',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log('Admin user created:', admin.email);

  const products = [
    {
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with A17 Pro chip and titanium design',
      shortDescription: 'Premium flagship smartphone',
      price: 999.99,
      compareAtPrice: 1099.99,
      stock: 50,
      images: ['https://via.placeholder.com/400x400?text=iPhone+15+Pro'],
      thumbnail: 'https://via.placeholder.com/200x200?text=iPhone',
      category: 'Electronics',
      tags: ['smartphone', 'apple', 'featured'],
      isFeatured: true,
    },
    {
      name: 'MacBook Pro 16',
      description: 'Powerful laptop with M3 Max chip for professionals',
      shortDescription: 'Professional laptop',
      price: 2499.99,
      stock: 30,
      images: ['https://via.placeholder.com/400x400?text=MacBook+Pro'],
      thumbnail: 'https://via.placeholder.com/200x200?text=MacBook',
      category: 'Computers',
      tags: ['laptop', 'apple', 'professional'],
      isFeatured: true,
    },
    {
      name: 'AirPods Pro',
      description: 'Wireless earbuds with active noise cancellation',
      shortDescription: 'Premium wireless earbuds',
      price: 249.99,
      stock: 100,
      images: ['https://via.placeholder.com/400x400?text=AirPods+Pro'],
      thumbnail: 'https://via.placeholder.com/200x200?text=AirPods',
      category: 'Audio',
      tags: ['earbuds', 'apple', 'wireless'],
    },
  ];

  for (const product of products) {
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    await prisma.product.upsert({
      where: { slug },
      update: {},
      create: {
        ...product,
        slug,
        sku,
      },
    });

    console.log(` Product created: ${product.name}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
