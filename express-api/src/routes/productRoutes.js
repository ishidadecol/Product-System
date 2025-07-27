import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

// Protected Routes
router.get('/',  productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/',  productController.createProduct);
router.put('/:id',  productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

export default router;
