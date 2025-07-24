import express from 'express';
import { authenticateToken } from './middleware/authMiddleware.js';
import * as productController from './controllers/productController.js';

const router = express.Router();



// Protected Routes
router.get('/products', authenticateToken, productController.getAllProducts);
router.get('/products/:id', authenticateToken, productController.getProductById);
router.post('/products', authenticateToken, productController.createProduct);
router.put('/products/:id', authenticateToken, productController.updateProductById);
router.delete('/products/:id', authenticateToken, productController.deleteProductById);

export default router;
