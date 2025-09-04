import swaggerJSDoc from 'swagger-jsdoc';
import { PORT } from './env.config.js';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Examen de Grado API',
    version: '1.0.0',
    description:
      'Documentación de la API REST para gestión de usuarios con autenticación JWT',
    contact: {
      name: 'API Support',
      email: 'support@examen.com',
    },
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api/v1`,
      description: 'Servidor de desarrollo',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Introduce el token JWT en el formato: Bearer <token>',
      },
    },
    schemas: {
      User: {
        type: 'object',
        required: ['name', 'mail', 'pwd'],
        properties: {
          id: {
            type: 'integer',
            description: 'ID único del usuario',
            example: 1,
            readOnly: true,
          },
          name: {
            type: 'string',
            description: 'Nombre completo del usuario',
            example: 'Juan Pérez',
            maxLength: 250,
          },
          mail: {
            type: 'string',
            description: 'Correo electrónico del usuario',
            example: 'juan.perez@email.com',
            maxLength: 250,
            format: 'email',
          },
          pwd: {
            type: 'string',
            description: 'Contraseña del usuario (mínimo 6 caracteres)',
            example: 'password123',
            maxLength: 250,
            format: 'password',
          },
        },
      },
      LoginCredentials: {
        type: 'object',
        required: ['mail', 'pwd'],
        properties: {
          mail: {
            type: 'string',
            description: 'Correo electrónico del usuario',
            example: 'juan.perez@email.com',
            format: 'email',
          },
          pwd: {
            type: 'string',
            description: 'Contraseña del usuario',
            example: 'password123',
            format: 'password',
          },
        },
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Indica si la operación fue exitosa',
            example: true,
          },
          message: {
            type: 'string',
            description: 'Mensaje descriptivo del resultado',
            example: 'Usuario creado exitosamente',
          },
          data: {
            type: 'object',
            description: 'Datos de la respuesta (opcional)',
            nullable: true,
          },
          error: {
            type: 'object',
            description: 'Información de error (solo en respuestas fallidas)',
            properties: {
              code: {
                type: 'string',
                description: 'Código de error',
                example: 'VALIDATION_ERROR',
              },
              details: {
                type: 'string',
                description: 'Detalles adicionales del error',
                example: 'El correo electrónico ya está registrado',
                nullable: true,
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Error al procesar la solicitud',
          },
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'string',
                example: 'INTERNAL_ERROR',
              },
              details: {
                type: 'string',
                example: 'Error interno del servidor',
                nullable: true,
              },
            },
          },
        },
      },
    },
    responses: {
      UnauthorizedError: {
        description: 'Token JWT inválido o no proporcionado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            example: {
              success: false,
              message: 'No autorizado',
              error: {
                code: 'UNAUTHORIZED',
                details: 'Token JWT requerido',
              },
            },
          },
        },
      },
      ValidationError: {
        description: 'Datos de entrada inválidos',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            example: {
              success: false,
              message: 'Datos inválidos',
              error: {
                code: 'VALIDATION_ERROR',
                details: 'El campo email es requerido',
              },
            },
          },
        },
      },
      NotFoundError: {
        description: 'Recurso no encontrado',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ErrorResponse',
            },
            example: {
              success: false,
              message: 'Usuario no encontrado',
              error: {
                code: 'NOT_FOUND',
              },
            },
          },
        },
      },
    },
    parameters: {
      userId: {
        name: 'id',
        in: 'path',
        description: 'ID del usuario',
        required: true,
        schema: {
          type: 'integer',
          example: 1,
        },
      },
      AcceptHeader: {
        name: 'Accept',
        in: 'header',
        description: 'Debe ser application/json',
        required: true,
        schema: {
          type: 'string',
          enum: ['application/json'],
          default: 'application/json',
        },
      },
      ContentTypeHeader: {
        name: 'Content-Type',
        in: 'header',
        description: 'Debe ser application/json',
        required: true,
        schema: {
          type: 'string',
          enum: ['application/json'],
          default: 'application/json',
        },
      },
    },
  },
  tags: [
    {
      name: 'Autenticación',
      description: 'Operaciones de login and autenticación',
    },
    {
      name: 'Usuarios',
      description: 'Operaciones CRUD para gestión de usuarios',
    },
  ],
  paths: {
    '/usuario/login': {
      post: {
        tags: ['Autenticación'],
        summary: 'Iniciar sesión',
        description: 'Autentica un usuario y devuelve un token JWT',
        operationId: 'loginUser',
        parameters: [
          {
            $ref: '#/components/parameters/ContentTypeHeader',
          },
          {
            $ref: '#/components/parameters/AcceptHeader',
          },
        ],
        requestBody: {
          description: 'Credenciales de login',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginCredentials',
              },
              example: {
                mail: 'usuario@ejemplo.com',
                pwd: 'password123',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login exitoso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
                example: {
                  success: true,
                  message: 'Login exitoso',
                  data: {
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    user: {
                      id: 1,
                      name: 'Juan Pérez',
                      mail: 'juan.perez@email.com',
                    },
                  },
                },
              },
            },
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },
          '422': {
            $ref: '#/components/responses/ValidationError',
          },
        },
      },
    },
    '/usuario': {
      post: {
        tags: ['Usuarios'],
        summary: 'Crear usuario',
        description: 'Crea un nuevo usuario en el sistema',
        operationId: 'createUser',
        parameters: [
          {
            $ref: '#/components/parameters/ContentTypeHeader',
          },
          {
            $ref: '#/components/parameters/AcceptHeader',
          },
        ],
        requestBody: {
          description: 'Datos del usuario a crear',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                name: 'María García',
                mail: 'maria.garcia@email.com',
                pwd: 'password123',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Usuario creado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
                example: {
                  success: true,
                  message: 'Usuario creado exitosamente',
                  data: {
                    id: 2,
                    name: 'María García',
                    mail: 'maria.garcia@email.com',
                  },
                },
              },
            },
          },
          '409': {
            description: 'Conflicto - El usuario ya existe',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  success: false,
                  message: 'El correo electrónico ya está registrado',
                  error: {
                    code: 'CONFLICT',
                  },
                },
              },
            },
          },
          '422': {
            $ref: '#/components/responses/ValidationError',
          },
        },
      },
      get: {
        tags: ['Usuarios'],
        summary: 'Obtener todos los usuarios',
        description: 'Retorna una lista de todos los usuarios registrados',
        operationId: 'getAllUsers',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            $ref: '#/components/parameters/AcceptHeader',
          },
        ],
        responses: {
          '200': {
            description: 'Lista de usuarios obtenida exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
                example: {
                  success: true,
                  message: 'Usuarios obtenidos exitosamente',
                  data: [
                    {
                      id: 1,
                      name: 'Juan Pérez',
                      mail: 'juan.perez@email.com',
                    },
                    {
                      id: 2,
                      name: 'María García',
                      mail: 'maria.garcia@email.com',
                    },
                  ],
                },
              },
            },
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },
          '403': {
            description: 'Acceso prohibido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  success: false,
                  message: 'No tienes permisos para realizar esta acción',
                  error: {
                    code: 'FORBIDDEN',
                  },
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Usuarios'],
        summary: 'Actualizar usuario',
        description: 'Actualiza los datos de un usuario existente',
        operationId: 'updateUser',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            $ref: '#/components/parameters/ContentTypeHeader',
          },
          {
            $ref: '#/components/parameters/AcceptHeader',
          },
        ],
        requestBody: {
          description: 'Datos actualizados del usuario',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                id: 1,
                name: 'Juan Pérez Actualizado',
                mail: 'juan.actualizado@email.com',
                pwd: 'nuevapassword123',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Usuario actualizado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
                example: {
                  success: true,
                  message: 'Usuario actualizado exitosamente',
                  data: {
                    id: 1,
                    name: 'Juan Pérez Actualizado',
                    mail: 'juan.actualizado@email.com',
                  },
                },
              },
            },
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },
          '403': {
            description: 'Acceso prohibido - No es el propietario del recurso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  success: false,
                  message: 'No tienes permisos para modificar este usuario',
                  error: {
                    code: 'FORBIDDEN',
                  },
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFoundError',
          },
          '422': {
            $ref: '#/components/responses/ValidationError',
          },
        },
      },
    },
    '/usuario/{id}': {
      get: {
        tags: ['Usuarios'],
        summary: 'Obtener usuario por ID',
        description: 'Retorna los datos de un usuario específico por su ID',
        operationId: 'getUserById',
        security: [{ bearerAuth: [] }],
        parameters: [
          { $ref: '#/components/parameters/userId' },
          {
            $ref: '#/components/parameters/AcceptHeader',
          },
        ],
        responses: {
          '200': {
            description: 'Usuario obtenido exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
                example: {
                  success: true,
                  message: 'Usuario obtenido exitosamente',
                  data: {
                    id: 1,
                    name: 'Juan Pérez',
                    mail: 'juan.perez@email.com',
                  },
                },
              },
            },
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },
          '403': {
            description: 'Acceso prohibido',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  success: false,
                  message: 'No tienes permisos para acceder a este recurso',
                  error: {
                    code: 'FORBIDDEN',
                  },
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFoundError',
          },
        },
      },
      delete: {
        tags: ['Usuarios'],
        summary: 'Eliminar usuario',
        description: 'Elimina un usuario del sistema por su ID',
        operationId: 'deleteUser',
        security: [{ bearerAuth: [] }],
        parameters: [
          { $ref: '#/components/parameters/userId' },
          {
            $ref: '#/components/parameters/AcceptHeader',
          },
        ],
        responses: {
          '200': {
            description: 'Usuario eliminado exitosamente',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ApiResponse',
                },
                example: {
                  success: true,
                  message: 'Usuario eliminado exitosamente',
                  data: null,
                },
              },
            },
          },
          '401': {
            $ref: '#/components/responses/UnauthorizedError',
          },
          '403': {
            description: 'Acceso prohibido - No es el propietario del recurso',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  success: false,
                  message: 'No tienes permisos para eliminar este usuario',
                  error: {
                    code: 'FORBIDDEN',
                  },
                },
              },
            },
          },
          '404': {
            $ref: '#/components/responses/NotFoundError',
          },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [
    './src/resources/v1/user/user.controller.ts',
    './src/routes/v1.route.ts',
    './src/resources/v1/user/user.routes.ts',
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
