import express from 'express';
import { protectRoute } from '../middleware/protectRoute.middleware.js';
import { getUsersForSideBar } from '../controller/users.controller.js';

const userRoutes = express.Router()

userRoutes.get('/',protectRoute,getUsersForSideBar)

export default userRoutes;