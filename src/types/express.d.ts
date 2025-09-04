// examen_de_grado/src/types/express.d.ts

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
      };
    }
  }
}

// Exportar para uso en otros archivos
export {};
