import { Router } from 'express';
import productController from '../controllers/product.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/public', productController.getActiveProducts);
router.get('/public/slug/:slug', productController.getProductBySlug);

// Protected routes (Admin only)
router.post('/', authenticate, authorize('ADMIN'), productController.createProduct);
router.get('/', authenticate, authorize('ADMIN'), productController.getProducts);
router.get('/:id', authenticate, authorize('ADMIN'), productController.getProductById);
router.patch('/:id', authenticate, authorize('ADMIN'), productController.updateProduct);
router.delete('/:id', authenticate, authorize('ADMIN'), productController.deleteProduct);

export default router;
