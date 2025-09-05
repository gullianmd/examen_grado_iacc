import rateLimit from 'express-rate-limit';
import { createErrorResponse } from '../common/models/api-response.model.js';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de solicitudes por IP
  handler: (req, res) => {
    const response = createErrorResponse(
      'Demasiadas solicitudes. Por favor, intente de nuevo más tarde.',
      'RATE_LIMIT_EXCEEDED',
    );
    res.status(429).json(response);
  },
  standardHeaders: true,
  legacyHeaders: false,
});
