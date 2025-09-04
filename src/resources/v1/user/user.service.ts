import { UserSchema, type User } from './entities/user.entity.js';
import { AppDataSource } from '../../../config/database.config.js';
import { logger } from '../../../common/services/winston.service.js';
import {
  hashPassword,
  comparePassword,
} from '../../../common/utils/crypt.util.js';
import * as logUtils from '../../../common/utils/log.util.js';
import type { UserDto } from './dto/user.dto.js';
import {
  createSuccessResponse,
  createCreatedResponse,
  createErrorResponse,
  createNotFoundResponse,
  createConflictResponse,
  createHashErrorResponse,
  createUnauthorizedResponse,
  type ApiResponse,
} from '../../../common/models/api-response.model.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/env.config.js';

const userRepository = AppDataSource.getRepository(UserSchema);

export async function createUser(user: User): Promise<ApiResponse<UserDto>> {
  try {
    const actualUser = await userRepository.findOneBy({ mail: user.mail });
    if (actualUser) {
      return createConflictResponse(
        'No se puede crear usuario con esa cuenta de correo',
      );
    }

    const hashedPassword = await hashPassword(user.pwd);
    if (hashedPassword === null) {
      return createHashErrorResponse('Error interno al hashear contraseña');
    }

    user.pwd = hashedPassword;
    const result = await userRepository.save(user);
    return createCreatedResponse(
      'Usuario creado exitosamente',
      setSafeUser(result),
    );
  } catch (error) {
    const errMsg = logUtils.getErrMsg(error);
    logger.error(errMsg);
    return createErrorResponse<UserDto>(
      'Error al crear usuario',
      'CREATE_ERROR',
      errMsg,
    );
  }
}

export async function updateUser(user: User): Promise<ApiResponse<UserDto>> {
  try {
    // Verificar que el usuario existe primero
    if (!user.id) {
      return createErrorResponse<UserDto>(
        'ID de usuario es requerido para actualizar',
        'VALIDATION_ERROR',
      );
    }

    const existingUser = await userRepository.findOneBy({ id: user.id });
    if (!existingUser) {
      return createNotFoundResponse('Usuario no encontrado para actualizar');
    }

    let hashedPassword = user.pwd;

    // Solo hashear la contraseña si se proporcionó una nueva
    if (user.pwd) {
      const hashed = await hashPassword(user.pwd);
      if (hashed === null) {
        return createHashErrorResponse('Error interno al hashear contraseña');
      }
      hashedPassword = hashed;
    } else {
      // Mantener la contraseña existente si no se proporcionó una nueva
      hashedPassword = existingUser.pwd;
    }

    const result = await userRepository.update(
      { id: user.id },
      {
        mail: user.mail ?? existingUser.mail,
        name: user.name ?? existingUser.name,
        pwd: hashedPassword,
      },
    );

    if (result.affected === 0) {
      return createErrorResponse<UserDto>(
        'Usuario no actualizado',
        'UPDATE_ERROR',
      );
    }

    return createSuccessResponse(
      'Usuario actualizado exitosamente',
      setSafeUser({
        id: user.id,
        name: user.name ?? existingUser.name,
        mail: user.mail ?? existingUser.mail,
      }),
    );
  } catch (error) {
    const errMsg = logUtils.getErrMsg(error);
    logger.error(errMsg);
    return createErrorResponse<UserDto>(
      'Error al actualizar usuario',
      'UPDATE_ERROR',
      errMsg,
    );
  }
}

export async function deleteUser(id: number): Promise<ApiResponse<null>> {
  try {
    const result = await userRepository.delete({ id });

    if (result.affected === 0) {
      return createNotFoundResponse('Usuario no encontrado para eliminar');
    }

    return createSuccessResponse('Usuario eliminado exitosamente');
  } catch (error) {
    const errMsg = logUtils.getErrMsg(error);
    logger.error(errMsg);
    return createErrorResponse(
      'Error al eliminar usuario',
      'DELETE_ERROR',
      errMsg,
    );
  }
}

export function getDummyUser() {
  return {
    name: 'John Doe',
    age: 31,
  };
}

export async function getAllUsers(): Promise<ApiResponse<UserDto[]>> {
  try {
    const users = await userRepository.find();
    const userDtos = users.map(setSafeUser);
    return createSuccessResponse('Usuarios obtenidos exitosamente', userDtos);
  } catch (error) {
    const errMsg = logUtils.getErrMsg(error);
    logger.error(errMsg);
    return createErrorResponse<UserDto[]>(
      'Error al obtener usuarios',
      'FETCH_ERROR',
      errMsg,
    );
  }
}

export async function getUserById(id: number): Promise<ApiResponse<UserDto>> {
  try {
    const user = await userRepository.findOneBy({ id });
    if (user === null) {
      return createNotFoundResponse('Usuario no encontrado');
    }

    return createSuccessResponse(
      'Usuario obtenido exitosamente',
      setSafeUser(user),
    );
  } catch (error) {
    const errMsg = logUtils.getErrMsg(error);
    logger.error(errMsg);
    return createErrorResponse<UserDto>(
      'Error al obtener usuario',
      'FETCH_ERROR',
      errMsg,
    );
  }
}

export async function getUserByMail(
  mail: string,
): Promise<ApiResponse<UserDto>> {
  try {
    const user = await userRepository.findOneBy({ mail });
    if (user === null) {
      return createNotFoundResponse('Usuario no encontrado');
    }

    return createSuccessResponse(
      'Usuario obtenido exitosamente',
      setSafeUser(user),
    );
  } catch (error) {
    const errMsg = logUtils.getErrMsg(error);
    logger.error(errMsg);
    return createErrorResponse<UserDto>(
      'Error al obtener usuario por email',
      'FETCH_ERROR',
      errMsg,
    );
  }
}

export function setSafeUser({
  id,
  mail,
  name,
}: Partial<User> & Pick<User, 'mail' | 'name'>): UserDto {
  const result: UserDto = {
    mail,
    name,
  };

  if (id) result.id = id;

  return result;
}

export interface LoginCredentials {
  mail: string;
  pwd: string;
}

export interface AuthResponse {
  token: string;
  user: UserDto;
}

export async function authenticateUser(
  credentials: LoginCredentials,
): Promise<ApiResponse<AuthResponse>> {
  try {
    const user = await userRepository.findOneBy({ mail: credentials.mail });

    if (!user) {
      return createUnauthorizedResponse('Credenciales inválidas');
    }

    const isPasswordValid = await comparePassword(credentials.pwd, user.pwd);

    if (!isPasswordValid) {
      return createUnauthorizedResponse('Credenciales inválidas');
    }

    if (!JWT_SECRET) {
      return createErrorResponse<AuthResponse>(
        'Error de configuración del servidor',
        'CONFIG_ERROR',
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.mail,
      },
      JWT_SECRET,
      { expiresIn: '24h' },
    );

    const authResponse: AuthResponse = {
      token,
      user: setSafeUser(user),
    };

    return createSuccessResponse('Autenticación exitosa', authResponse);
  } catch {
    return createErrorResponse<AuthResponse>(
      'Error en la autenticación',
      'AUTH_ERROR',
    );
  }
}
