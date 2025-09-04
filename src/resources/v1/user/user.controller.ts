// examen_de_grado/src/resources/v1/user/user.controller.ts
import type { Request, Response, NextFunction } from 'express';
import * as userService from './user.service.js';
import type { User } from './entities/user.entity.js';
import { getStatusCodeFromResponse } from '../../../common/models/api-response.model.js';
import { authenticateJWT } from '../../../common/middlewares/auth.middleware.js';
import { createUnauthorizedResponse } from '../../../common/models/api-response.model.js';

// Middleware para validar que el usuario autenticado es el mismo que se intenta modificar
function validateUserOwnership(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const userId = parseInt(req.params.id ?? '0');

  if (req.user && req.user.id === userId) {
    next();
  } else {
    const response = createUnauthorizedResponse(
      'No tienes permisos para realizar esta acción',
    );
    res.status(403).send(response);
  }
}

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const result = await userService.getAllUsers();
    const statusCode = getStatusCodeFromResponse(result);
    res.status(statusCode).send(result);
  } catch {
    const response = createUnauthorizedResponse('Error al obtener usuarios');
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
  }
}

export async function postUser(req: Request, res: Response): Promise<void> {
  try {
    const newUser = req.body as User;
    const result = await userService.createUser(newUser);
    const statusCode = getStatusCodeFromResponse(result);
    res.status(statusCode).send(result);
  } catch {
    const response = createUnauthorizedResponse('Error al crear usuario');
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
  }
}

export async function putUser(req: Request, res: Response): Promise<void> {
  try {
    const user = req.body as User;
    const result = await userService.updateUser(user);
    const statusCode = getStatusCodeFromResponse(result);
    res.status(statusCode).send(result);
  } catch {
    const response = createUnauthorizedResponse('Error al actualizar usuario');
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
  }
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  try {
    const id = +(req.params.id ?? '0');
    const result = await userService.deleteUser(id);
    const statusCode = getStatusCodeFromResponse(result);
    res.status(statusCode).send(result);
  } catch {
    const response = createUnauthorizedResponse('Error al eliminar usuario');
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
  }
}

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const id = +(req.params.id ?? '0');
    const result = await userService.getUserById(id);
    const statusCode = getStatusCodeFromResponse(result);
    res.status(statusCode).send(result);
  } catch {
    const response = createUnauthorizedResponse('Error al obtener usuario');
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
  }
}

export function getCurrentUser(req: Request, res: Response): void {
  try {
    res.status(200).json({
      success: true,
      message: 'Información del usuario autenticado',
      data: {
        id: req.user?.id,
        email: req.user?.email,
      },
    });
  } catch {
    const response = createUnauthorizedResponse(
      'Error al obtener información del usuario',
    );
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
  }
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const credentials = req.body as userService.LoginCredentials;
    const result = await userService.authenticateUser(credentials);
    const statusCode = getStatusCodeFromResponse(result);
    res.status(statusCode).send(result);
  } catch {
    const response = createUnauthorizedResponse('Error en el proceso de login');
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
  }
}

// Exportar los middlewares para ser usados en las rutas
export const userMiddlewares = {
  auth: authenticateJWT,
  validateOwnership: validateUserOwnership,
};
