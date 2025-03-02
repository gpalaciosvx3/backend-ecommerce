import prisma from "../config/db";
import { Role } from "../models/Role";

export class RoleRepository {
  /**
   * Crea Rol
   * @param name Nombre del Rol
   * @returns rol creado
   */
  async createRole(name: string) {
    return prisma.role.create({ data: { name } });
  }

  /**
   * Obtener rol
   * @param name | undefined - Nombre del rol
   * @returns Lista de roles
   */
  async findRole(name?: string): Promise<Role | Role[] | null> {
    if (!name) return prisma.role.findMany();

    // Busca un usuario por name
    return prisma.role.findFirst({
      where: { name }
    });
  }

  /**
   * Obtiene rol por ID
   * @param id ID del Rol
   * @returns rol creado
   */
  async findRoleById(id: string) {
    return prisma.role.findUnique({ where: { id } });
  }

  /**
   * Obtiene rol por nombre
   * @param name Nombre del Rol
   * @returns rol creado
   */
  async findRoleByName(name: string) {
    return prisma.role.findUnique({ where: { name } });
  }

  /**
   * Obtiene ID del rol por nombre
   * @param name Nombre del Rol
   * @returns IdRole
   */
  async findRoleIdByName(name: string) {
    const role = await prisma.role.findUnique({
      where: { name },
      select: { id: true }, 
    });
  
    return role ? String(role.id) : null; 
  }

  /**
   * Actualiza Rol
   * @param id ID del Rol
   * @param name Nombre del Rol
   * @returns rol creado
   */
  async updateRole(id: string, name: string) {
    return prisma.role.update({ where: { id }, data: { name } });
  }

  /**
   * Elimina Rol
   * @param id ID del Rol
   * @returns rol creado
   */
  async deleteRole(id: string) {
    return prisma.role.delete({ where: { id } });
  }
}
