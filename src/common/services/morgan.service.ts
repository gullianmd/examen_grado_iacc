import { logger } from './winston.service.js';
import type { StreamOptions } from 'morgan';

export const morganStream: StreamOptions = {
    write: (message: string) => logger.info(message.trim()),
};
