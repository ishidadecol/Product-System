import express from 'express';
import productRoutes from './routes/productRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));

app.use(express.json());

//MARK: ROUTES
app.use('/products',authMiddleware, productRoutes)

app.use('/auth',authRoutes)
export default app;