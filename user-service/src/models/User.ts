import { User as PrismaUser } from '@prisma/client'

/**
 * Modelo extendido de usuario
 */
export interface User extends PrismaUser {
  fullName?: string; 
}
