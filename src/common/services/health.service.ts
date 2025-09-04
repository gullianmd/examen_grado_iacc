import type { Request, Response, NextFunction } from 'express';
import { createSuccessResponse, getStatusCodeFromResponse } from '../models/api-response.model.js';

export function informHealth(req: Request, res: Response, next: NextFunction) {
    const response = createSuccessResponse('Estoy vivo!', {
        upTime: process.uptime(),
        entorno: process.env.NODE_ENV ?? 'development',
        artefacto: process.env.npm_package_name ?? 'api-service',
        version: process.env.npm_package_version ?? '1.0.0',
    });
    const httpStatus = getStatusCodeFromResponse(response);
    res.status(httpStatus).send(response);
}
