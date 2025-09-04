# Pruebas Unitarias con Jest

Este documento describe cómo ejecutar y entender las pruebas unitarias implementadas para la API.

## Pruebas Implementadas

### 1. Pruebas Básicas de Configuración (`basic.test.js`)
- Verifica que Jest está configurado correctamente
- Pruebas simples de suma, valores truthy e igualdad de objetos

### 2. Pruebas de Lógica de Usuario (`user-logic.test.js`)
- **getDummyUser**: Verifica que retorna un usuario dummy con propiedades correctas
- **setSafeUser**: Prueba que la función remueve la contraseña y mantiene solo propiedades seguras
- Validaciones de formato de email y fortaleza de contraseña
- Lógica de respuestas de API (éxito y error)

### 3. Pruebas de Lógica de Autenticación (`auth-logic.test.js`)
- Validación de formato de email
- Validación de fortaleza de contraseña
- Simulación de generación y verificación de tokens JWT
- Verificación de permisos de usuario y propiedad de recursos
- Manejo de errores de autenticación
- Seguridad de contraseñas (hashing y detección de contraseñas comunes)

## Comandos Disponibles

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch (desarrollo)
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## Estructura de Pruebas

Las pruebas están organizadas en el directorio `__tests__/` y siguen estos principios:

1. **Pruebas Aisladas**: No dependen de bases de datos o servicios externos
2. **Mocks Simples**: Usan funciones simuladas para dependencias externas
3. **Cobertura de Lógica**: Se enfocan en la lógica de negocio principal
4. **Validaciones**: Incluyen pruebas de validación de entrada y manejo de errores

## Cobertura Actual

Las pruebas actuales cubren:

- ✅ Funciones puras (sin side effects)
- ✅ Validación de entrada
- ✅ Lógica de autenticación
- ✅ Manejo de errores
- ✅ Respuestas de API

## Ejemplo de Ejecución

```bash
$ npm test

> examen_de_grado@1.0.0 test
> jest

 PASS  __tests__/auth-logic.test.js
 PASS  __tests__/user-logic.test.js
 PASS  __tests__/basic.test.js

Test Suites: 3 passed, 3 total
Tests:       22 passed, 22 total
Snapshots:   0 total
Time:        0.287 s
Ran all test suites.
```

## Dependencias de Pruebas

- **jest**: Framework de testing
- **ts-jest**: Soporte para TypeScript
- **@types/jest**: Tipos para Jest
- **supertest**: Para pruebas HTTP (futuro)
- **@types/supertest**: Tipos para SuperTest (futuro)

Las pruebas están diseñadas para ser simples, efectivas y fáciles de mantener, proporcionando una base sólida para la calidad del código de la API.
