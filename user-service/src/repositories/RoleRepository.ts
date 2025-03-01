import prisma from "../config/db";

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
   * Obtiene todos los Roles
   * @returns rol creado
   */
  async getAllRoles() {
    return prisma.role.findMany();
  }

  /**
   * Obtiene rol por ID
   * @param id ID del Rol
   * @returns rol creado
   */
  async getRoleById(id: string) {
    return prisma.role.findUnique({ where: { id } });
  }

  /**
   * Obtiene rol por nombre
   * @param name Nombre del Rol
   * @returns rol creado
   */
  async getRoleByName(name: string) {
    return prisma.role.findUnique({ where: { name } });
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
