import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Extraer el tipo User basado en la consulta Prisma
type PrismaUser = NonNullable<Awaited<ReturnType<typeof prisma.user.findUnique>>>;

/**
 * Modelo extendido de usuario 
 */
export interface User extends PrismaUser {
  fullName?: string;
}
