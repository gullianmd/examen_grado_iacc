export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: string | undefined;
  };
}

// Función base para crear respuestas
function createBaseResponse<T>(
  success: boolean,
  message: string,
  data?: T,
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  return response;
}

// Respuestas exitosas
export function createSuccessResponse<T>(
  message: string,
  data?: T,
): ApiResponse<T> {
  return createBaseResponse(true, message, data);
}

export function createCreatedResponse<T>(
  message: string,
  data?: T,
): ApiResponse<T> {
  return createBaseResponse(true, message, data);
}

// Respuestas de error genéricas
export function createErrorResponse<T = never>(
  message: string,
  errorCode = 'INTERNAL_ERROR',
  details?: string,
): ApiResponse<T> {
  const response: ApiResponse<T> = {
    success: false,
    message,
    error: {
      code: errorCode,
    },
  };

  if (details !== undefined) {
    response.error!.details = details;
  }

  return response;
}

// Respuestas de error específicas (sin data)
export function createNotFoundResponse(
  message = 'Recurso no encontrado',
): ApiResponse<never> {
  return createErrorResponse(message, 'NOT_FOUND');
}

export function createValidationErrorResponse(
  message = 'Datos inválidos',
  details?: string,
): ApiResponse<never> {
  return createErrorResponse(message, 'VALIDATION_ERROR', details);
}

export function createConflictResponse(
  message = 'Conflicto de datos',
): ApiResponse<never> {
  return createErrorResponse(message, 'CONFLICT');
}

export function createUnauthorizedResponse(
  message = 'No autorizado',
): ApiResponse<never> {
  return createErrorResponse(message, 'UNAUTHORIZED');
}

export function createForbiddenResponse(
  message = 'Acceso prohibido',
): ApiResponse<never> {
  return createErrorResponse(message, 'FORBIDDEN');
}

export function createNotAcceptableResponse(
  message = 'Accept/Content-type Incorrecto',
): ApiResponse<never> {
  return createErrorResponse(message, 'NOT_ACCEPTABLE');
}

export function createHashErrorResponse(
  message = 'Error al procesar contraseña',
): ApiResponse<never> {
  return createErrorResponse(message, 'HASH_ERROR');
}

// Helper para determinar el código HTTP basado en la respuesta
export function getStatusCodeFromResponse(response: ApiResponse): number {
  if (response.success) {
    return 200; // OK por defecto para éxito
  }

  switch (response.error?.code) {
    case 'NOT_FOUND':
      return 404;
    case 'VALIDATION_ERROR':
      return 422;
    case 'CONFLICT':
      return 409;
    case 'UNAUTHORIZED':
      return 401;
    case 'FORBIDDEN':
      return 403;
    case 'HASH_ERROR':
      return 500;
    case 'NOT_ACCEPTABLE':
      return 406;
    case 'RATE_LIMIT_EXCEEDED':
      return 429;
    default:
      return 500; // Internal Server Error por defecto
  }
}
