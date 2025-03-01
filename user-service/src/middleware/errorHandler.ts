import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from "../utils/ApiResponse";
// Clase base de error personalizada
class AppError extends Error {
  public statusCode: number;
  public details?: any; 

  constructor(message: string, statusCode: number, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

/*  Clases específicas de errores */

// Usuario no autorizado
class UnauthorizedError  extends AppError {
  constructor(message = "JWT => Usuario no autorizado") {
    super(message, 401);
  }
}
class InvalidTokenError  extends AppError {
  constructor(message = "JWT => Token no válido") {
    super(message, 403);
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
  const details = err.details || "Sin Detalles del Error";

  console.log('err: ', err);
  
  console.error(`[ERROR] ${message}`);

  res.status(statusCode).json(ApiResponse.error(message, statusCode, details));
};

export { 
  AppError,
  NotFoundError,
  UnauthorizedError,
  InvalidTokenError,
  errorHandler 
};
