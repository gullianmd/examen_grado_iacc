import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {
  createUnauthorizedResponse,
  getStatusCodeFromResponse,
} from '../models/api-response.model.js';

export interface JwtPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const response = createUnauthorizedResponse(
      'Token de autenticación requerido',
    );
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
    return;
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    const response = createUnauthorizedResponse('Formato de token inválido');
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
    return;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      const response = createUnauthorizedResponse(
        'Error de configuración del servidor',
      );
      const statusCode = getStatusCodeFromResponse(response);
      res.status(statusCode).send(response);
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Agregar información del usuario al request
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      const response = createUnauthorizedResponse('Token expirado');
      const statusCode = getStatusCodeFromResponse(response);
      res.status(statusCode).send(response);
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      const response = createUnauthorizedResponse('Token inválido');
      const statusCode = getStatusCodeFromResponse(response);
      res.status(statusCode).send(response);
      return;
    }

    const response = createUnauthorizedResponse('Error de autenticación');
    const statusCode = getStatusCodeFromResponse(response);
    res.status(statusCode).send(response);
  }
}

// Middleware opcional para verificar roles específicos
export function requireRole(): (
  req: Request,
  res: Response,
  next: NextFunction,
) => void {
  return function (req: Request, res: Response, next: NextFunction): void {
    // Por ahora simplemente permite el acceso si está autenticado
    if (!req.user) {
      const response = createUnauthorizedResponse('Acceso no autorizado');
      const statusCode = getStatusCodeFromResponse(response);
      res.status(statusCode).send(response);
      return;
    }
    next();
  };
}
