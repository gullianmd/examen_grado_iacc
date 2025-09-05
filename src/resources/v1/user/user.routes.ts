// examen_de_grado/src/resources/v1/user/user.routes.ts
import { Router } from 'express';
import * as userController from './user.controller.js';
import {
  cacheMiddleware,
  cacheKeyGenerators,
  invalidateCache,
} from '../../../common/middlewares/cache.middleware.js';

export const userRoutes = Router();

// Rutas públicas (sin autenticación)
userRoutes.post('/usuarios/login', userController.loginUser); // Login

// Rutas protegidas que requieren autenticación JWT
userRoutes.post(
  '/usuarios',
  //userController.userMiddlewares.auth,
  invalidateCache('user:'), // Invalidar caché de usuarios
  userController.postUser,
);

userRoutes.get(
  '/usuarios',
  userController.userMiddlewares.auth,
  cacheMiddleware(300, cacheKeyGenerators.byUser), // Cache por 5 minutos
  userController.getUser,
);

userRoutes.get(
  '/usuarios/:id',
  userController.userMiddlewares.auth,
  cacheMiddleware(300, cacheKeyGenerators.byParams), // Cache por 5 minutos
  userController.getUserById,
);

userRoutes.put(
  '/usuarios',
  userController.userMiddlewares.auth,
  invalidateCache('user:'),
  userController.putUser,
);

userRoutes.delete(
  '/usuario/:id',
  userController.userMiddlewares.auth,
  invalidateCache('user:'), // Invalidar caché de usuarios
  userController.deleteUser,
);
