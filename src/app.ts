import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { PORT } from './config/env.config.js';
import { v1Router } from './routes/v1.route.js';
import { logger } from './common/services/winston.service.js';
import { AppDataSource } from './config/database.config.js';
import { swaggerSpec } from './config/swagger.config.js';
import { limiter } from './config/limiter.config.js';
import { forbidAccess, validateHeaders } from './common/middlewares/security.middleware.js';
import morgan from 'morgan';
import { morganStream } from './common/services/morgan.service.js';
import { informHealth } from './common/services/health.service.js';

const app = express();

app.use(limiter);
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(morgan('short', { stream: morganStream } as morgan.Options<Request, Response>));
app.use(express.json());

app.use('/health', informHealth);
app.use('/api/v1', validateHeaders, v1Router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(forbidAccess);

const startServer = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    logger.info('Base de datos inicializada');

    app.listen(PORT, () => {
      logger.info(`Servicio corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    logger.error('Error al inicializar servicio / Base de datos:', error);
    process.exit(1);
  }
};

void startServer();

