import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limite de solicitudes por IP
    message: 'Demasiadas solicitudes. Por favor, intente de nuevo más tarde.',
    statusCode: 429,
});
