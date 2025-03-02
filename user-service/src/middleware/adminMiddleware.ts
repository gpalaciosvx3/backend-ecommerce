import { Request, Response, NextFunction } from "express";
import { config } from 'dotenv';
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { CacheService } from "../services/CacheService";
import { logger } from "../utils/logger";
import { UnauthorizedError, InvalidTokenError } from "./errorHandler";

config();

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository();
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) throw new UnauthorizedError("JWT => No autorizado, token no proporcionado");

    try {
        // Verificar si el token ha sido invalidado
        const isInvalid = await CacheService.isTokenInvalid(token);
        if (isInvalid) throw new InvalidTokenError("JWT => [CC] Token no Admin se encuentra en blackList. Por favor, inicie sesión nuevamente.")

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        // Verificar si el usuario sigue siendo admin en la base de datos
        const user = await userRepository.findById(decoded.userId);
        if (!user || user.roleId !== process.env.ADMIN_ROLE_ID) {
            logger.warn(`Acceso denegado: Usuario ${decoded.userId} ya no es admin.`);
            
            // Invalidar el token inmediatamente en Redis
            await CacheService.invalidateToken(token, decoded.exp ? decoded.exp - Math.floor(Date.now() / 1000) : 3600);

            throw new InvalidTokenError("ROL => Acceso denegado: No tienes permisos de administrador.")
        }

        logger.info(`Acceso permitido: Usuario admin ${user.username}`);
        next();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error inesperado";
      next(new InvalidTokenError(`${errorMessage}`));
    }
};
