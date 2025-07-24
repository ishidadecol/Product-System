import express from 'express';
import { login } from './controllers/authController.js';
import express from 'express';

const router = express.Router();
// Public routes
router.post('/auth/login', login);