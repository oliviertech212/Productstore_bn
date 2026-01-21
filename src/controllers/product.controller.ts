import { Request, Response } from 'express';
import productService from '../services/product.service';
import { createProductSchema, updateProductSchema } from '../validators/product.validator';
import { logger } from '../config/logger';

class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const validatedData = createProductSchema.parse(req.body);
      const product = await productService.createProduct(validatedData);

      return res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      logger.error('Error creating product:', error);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to create product',
      });
    }
  }

  async getProducts(req: Request, res: Response) {
    try {
      const result = await productService.getProducts(req.query);

      return res.status(200).json({
        success: true,
        data: result.products,
        pagination: result.pagination,
      });
    } catch (error: any) {
      logger.error('Error fetching products:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      logger.error('Error fetching product:', error);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to fetch product',
      });
    }
  }

  async getProductBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const product = await productService.getProductBySlug(slug);

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      logger.error('Error fetching product:', error);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to fetch product',
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateProductSchema.parse(req.body);
      const product = await productService.updateProduct(id, validatedData);

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error: any) {
      logger.error('Error updating product:', error);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to update product',
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await productService.deleteProduct(id);

      return res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error: any) {
      logger.error('Error deleting product:', error);
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Failed to delete product',
      });
    }
  }

  async getActiveProducts(req: Request, res: Response) {
    try {
      const result = await productService.getActiveProducts(req.query);

      return res.status(200).json({
        success: true,
        data: result.products,
        pagination: result.pagination,
      });
    } catch (error: any) {
      logger.error('Error fetching active products:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch products',
      });
    }
  }
}

export default new ProductController();
