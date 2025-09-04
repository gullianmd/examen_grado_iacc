import winston from 'winston';
const { combine, timestamp, errors, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  const safeMessage =
    typeof message === 'string' ? message : JSON.stringify(message);
  const stackTrace = typeof stack === 'string' ? `\n${stack}` : '';
  const safeTimeStamp = typeof timestamp === 'string' ? timestamp : 'no_date';
  return `${safeTimeStamp} [${level.toUpperCase()}]: ${safeMessage}${stackTrace}`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [
    new winston.transports.Console(),
  ],
  defaultMeta: { service: 'Examen-de-grado' },
});
