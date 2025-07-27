import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import * as productController from '../controllers/productController.js';

const router = express.Router();

// Protected Routes
router.get('/products', authMiddleware, productController.getAllProducts);
router.get('/products/:id', authMiddleware, productController.getProductById);
router.post('/products', authMiddleware, productController.createProduct);
router.put('/products/:id', authMiddleware, productController.updateProductById);
router.delete('/products/:id', authMiddleware, productController.deleteProductById);

export default router;
