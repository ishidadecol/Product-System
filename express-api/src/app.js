import express from 'express';
import productRoutes from './routes/productRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();
app.use(express.json());

//MARK: ROUTES
app.use('/products',authMiddleware, productRoutes)

app.use('auth/login',authRoutes)
export default app;