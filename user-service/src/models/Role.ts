import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Extraer el tipo Role basado en la consulta Prisma
type PrismaRole = NonNullable<Awaited<ReturnType<typeof prisma.role.findUnique>>>;

/**
 * Modelo extendido de usuario 
 */
export interface Role extends PrismaRole {
  fullName?: string;
}
