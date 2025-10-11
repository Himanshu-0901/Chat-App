import express from 'express';
import { login, logout, signup} from '../controller/auth.controller.js';

const authRoutes = express.Router();

authRoutes.post('/login',login)
authRoutes.post('/logout',logout)
authRoutes.post('/signup',signup)

export default authRoutes;