import bcrypt from 'bcrypt';
import { logger } from '../services/winston.service.js';

export async function hashPassword(password: string): Promise<string | null> {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    logger.error(error);
    return null;
  }
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    logger.error(error);
    return false;
  }
}
