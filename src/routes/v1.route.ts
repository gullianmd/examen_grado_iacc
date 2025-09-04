import { Router } from 'express';
import { userRoutes } from '../resources/v1/user/user.routes.js';

export const v1Router = Router();

v1Router.use(userRoutes);
