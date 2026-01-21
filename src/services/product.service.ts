import { prisma } from '../lib/prisma';
import { ApiError } from '../utils/ApiError';

export class ProductService {
  async createProduct(data: any) {
    const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const sku = `SKU-${Date.now()}`;

    const existingProduct = await prisma.product.findFirst({
      where: { OR: [{ slug }, { sku: data.sku || sku }] },
    });

    if (existingProduct) {
      throw new ApiError(400, 'Product with this name or SKU already exists');
    }

    return await prisma.product.create({
      data: { ...data, slug, sku: data.sku || sku },
    });
  }

  async getProducts(filters: any) {
    const { search, category, status, minPrice, maxPrice, isFeatured, page = 1, limit = 10 } = filters;

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) where.category = category;
    if (status) where.status = status;
    if (isFeatured !== undefined) where.isFeatured = isFeatured === 'true';

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    await prisma.product.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
    return product;
  }

  async getProductBySlug(slug: string) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    await prisma.product.update({
      where: { id: product.id },
      data: { viewCount: { increment: 1 } },
    });
    return product;
  }

  async updateProduct(id: string, data: any) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    if (data.name && data.name !== product.name) {
      const slug = data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      data.slug = slug;
    }

    return await prisma.product.update({ where: { id }, data });
  }

  async deleteProduct(id: string) {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    await prisma.product.delete({ where: { id } });
  }

  async getActiveProducts(filters: any) {
    const { search, category, minPrice, maxPrice, page = 1, limit = 10 } = filters;

    const where: any = { status: 'ACTIVE' };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) where.category = category;

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          slug: true,
          shortDescription: true,
          price: true,
          compareAtPrice: true,
          stock: true,
          images: true,
          thumbnail: true,
          category: true,
          tags: true,
          isFeatured: true,
          viewCount: true,
          createdAt: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}

export default new ProductService();
