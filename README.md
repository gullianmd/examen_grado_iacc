# Examen de Grado - API REST

## 📋 Descripción del Proyecto

API REST desarrollada en Node.js con Express y TypeScript para mi examen de grado. Este servicio proporciona un prototipo siguiendo principios RESTful y buenas practicas en cuanto seguridad y desarrollo.

## 🚀 Características Principales

### 🔐 Autenticación y Seguridad
- **Autenticación JWT** para rutas protegidas
- **Rate Limiting** configurado para prevenir ataques DDoS
- **Validación de headers** para asegurar content-type adecuado
- **CORS configurado** solo para métodos HTTP necesarios (GET, POST, PUT, DELETE)

### 📊 Gestión de Datos
- **Base de datos PostgreSQL** con TypeORM


### 📚 Documentación
- **Swagger UI integrado** en `/api-docs`
- **Documentación completa** de todos los endpoints
- **Ejemplos de requests/responses**
- **Esquemas de datos** documentados

### ⚡ Rendimiento y Optimización
- **Sistema de caché** para respuestas frecuentes
- **Compresión de respuestas** automática
- **Logging estructurado** con Winston

## 🛠️ Tecnologías Utilizadas

- **Runtime**: Node.js
- **Framework**: Express.js
- **Lenguaje**: TypeScript
- **Base de datos**: PostgreSQL con TypeORM
- **Autenticación**: JWT (JSON Web Tokens)
- **Documentación**: Swagger/OpenAPI 3.0
- **Caché**: node-cache
- **Seguridad**: express-rate-limit, cors
- **Logging**: Winston + Morgan
- **Contenedores**: Docker & Docker Compose

## 📦 Estructura del Proyecto

```
examen_de_grado/
├── src/
│   ├── common/           # Utilidades y servicios compartidos
│   │   ├── middlewares/  # Middlewares personalizados
│   │   ├── models/       # Modelos de datos y respuestas
│   │   ├── services/     # Servicios (logging, caché, etc.)
│   │   └── utils/        # Utilidades varias
│   ├── config/           # Configuraciones
│   ├── constants/        # Constantes de la aplicación
│   ├── resources/        # Recursos por versión de API
│   │   └── v1/
│   │       └── user/     # Módulo de usuarios
│   ├── routes/           # Definición de rutas
│   └── types/            # Definiciones de TypeScript
├── docker/               # Configuración de Docker
└── docs/                 # Documentación adicional
```

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- PostgreSQL 15+
- Docker (opcional)

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run start
```

### Con Docker
```bash
docker-compose up -d
```

## 📡 Endpoints Principales

### Autenticación
- `POST /api/v1/usuario/login` - Iniciar sesión

### Usuarios
- `POST /api/v1/usuario` - Crear usuario (público)
- `GET /api/v1/usuario` - Obtener todos los usuarios (requiere auth)
- `GET /api/v1/usuario/:id` - Obtener usuario por ID (requiere auth)
- `PUT /api/v1/usuario` - Actualizar usuario (requiere auth)
- `DELETE /api/v1/usuario/:id` - Eliminar usuario (requiere auth)

## 🔧 Configuración

El proyecto utiliza variables de entorno para configuración. Crear un archivo `.env` con:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dev
DB_USER=usr_dev_pg
DB_PASSWORD=pwd_dev_pg
JWT_SECRET=tu_clave_secreta_jwt
```

## 📊 Estado del Servicio

El servicio incluye endpoints de health check y métricas de rendimiento integradas. Todas las respuestas siguen un formato estándar:

```json
{
  "success": true,
  "message": "Mensaje descriptivo",
  "data": { ... },
  "error": { ... }
}
```

## 🐛 Reportar Issues

Para reportar problemas o sugerir mejoras, por favor crear un issue en el repositorio del proyecto incluyendo:
- Descripción detallada del problema
- Pasos para reproducir
- Logs relevantes
- Configuración del entorno

---

**Autor**: Gullian Mardones Diaz |
**Correo**: g.mardones@outlook.com |
**Versión**: 1.0.0 |
**Última actualización**: Septiembre 2025
