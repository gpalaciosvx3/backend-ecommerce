import { Request, Response, NextFunction } from 'express';

// Clase base de error personalizada
class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/*  Clases específicas de errores */

// Usuario no autorizado
class UnauthorizedError  extends AppError {
  constructor(message = "USR => Usuario no autorizado") {
    super(message, 401);
  }
}

// Recursos no definidos
class NotFoundError extends AppError {
  constructor(message = "USR => Recurso no encontrado") {
    super(message, 404);
  }
}

// Middleware de manejo de errores global
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";
  console.error(`[ERROR] ${message}`);

  res.status(statusCode).json({ error: message });
};

export { 
  AppError,
  NotFoundError,
  UnauthorizedError,
  errorHandler 
};
