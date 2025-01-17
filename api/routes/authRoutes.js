import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

//define the post route
router.post('/login', loginUser);

export default router;
