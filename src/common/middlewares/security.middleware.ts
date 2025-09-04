import type { NextFunction, Request, Response } from 'express';
import {
  createNotAcceptableResponse,
  createForbiddenResponse,
  getStatusCodeFromResponse,
} from '../models/api-response.model.js';

export function validateHeaders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const headers = req.headers;
  const method = req.method.toLocaleUpperCase();
  const validAccept = headers.accept === 'application/json';

  if (method.includes('POST') || method.includes('PUT')) {
    const validContentType = headers['content-type'] === 'application/json';
    if (!validContentType) {
      const response = createNotAcceptableResponse(
        'Accept/Content-Type no válidos',
      );
      const httpStatusCode = getStatusCodeFromResponse(response);
      return res.status(httpStatusCode).send(response);
    }
  }

  if (!validAccept) {
    const response = createNotAcceptableResponse('Accept no válido');
    const httpStatusCode = getStatusCodeFromResponse(response);
    return res.status(httpStatusCode).send(response);
  }
  next();
}

export function forbidAccess(
  req: Request,
  res: Response,
  next: NextFunction,
) {
    const response = createForbiddenResponse();
    const httpStatusCode = getStatusCodeFromResponse(response);
    return res.status(httpStatusCode).send(response);
}
