import { config } from 'dotenv';
import prisma from '../config/db'
import { User } from "../models/User";

config(); 
export class UserRepository {
  /**
   * Obtener todos los usuarios
   * @returns Lista de usuarios
   */
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  /**
   * Obtener usuario
   * @param username | undefined - Nombre del usuario
   * @returns Lista de usuarios
   */
  async findUser(username?: string): Promise<User | User[] | null> {
      if (!username) {
        return prisma.user.findMany({
            include: {
                role: { select: { name: true } } 
            }
        });
    }
    
    return prisma.user.findFirst({
        where: { username },
        include: {
            role: { select: { name: true } } 
        }
    });
  }

  /**
   * Obtener usuario por ID
   * @param id Id del usuario
   * @returns Lista de usuarios
   */
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  /**
   * Obtener usuario por username
   * @param username Nombre del usuario
   * @returns Lista de usuarios
   */
  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ 
      where: { username },
      include: {
        role: { select: {name: true } }
      }
    });
  }

  /**
   * Obtener usuario por username
   * @param username Nombre del usuario
   * @returns Lista de usuarios
   */
  async findOnlyByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ 
      where: { username }
    });
  }
    
  /**
   * Crear un nuevo usuario
   * @param name - Nombre de pila del usuario
   * @param email - Email del usuario
   * @param password - Contraseña (debe estar encriptada antes de llamar este método)
   * @param username - Nombre de usuario
   * @param roleId - ID del rol
   * @returns Usuario creado
   */
  async createUser(name: string, email: string, password: string, username: string, roleId: string): Promise<User> {
    return prisma.user.create({
      data: {
        name,
        email,
        password,
        username,
        role: {
          connect: { id: roleId } 
        }
      },
    });
  }

  /**
   * Actualiza Status
   * @param username - Nombre de usuario
   * @param status - Status de usuario
   * @returns Usuario actualizado
   */
  async updateStatus(username: string, status: string): Promise<User | null> {
    return prisma.user.update({
      where: { username },
      data: { status }
    });
  }

  /**
   * Actualizar un usuario (Ej: desactivarlo)
   * @param username - Username del usuario
   * @param data - Datos a actualizar
   * @returns Usuario actualizado
   */
  async updateUser(username: string, data: Partial<User>): Promise<User | null> {
    return prisma.user.update({
      where: { username },
      data,
    });
  }

  /**
   * Actualiza el rol de un usuario
   * @param userId - ID del usuario
   * @param newRoleId - Nuevo ID del rol
   * @returns Usuario actualizado
   */
  async updateRole(userId: string, newRoleId: string) {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { roleId: newRoleId }
    });

    return updatedUser;
  }

   /**
     * Contar usuarios con rol de admin
     * @returns Número total de usuarios con rol admin
     */
   async countAdmins(): Promise<number> {
    try {
        const adminRoleId = process.env.ADMIN_ROLE_ID;

        const count = await prisma.user.count({
            where: { roleId: adminRoleId }
        });

        return count;
    } catch (error) {
        return 0;
    }
  }

  /**
   * Obtener usuario por ID
   * @param roleId RoleId del usuario
   * @returns Lista de usuarios
   */
  async findByRoleId(roleId: string): Promise<User[]> {
    return prisma.user.findMany({ where: { roleId } });
  }

}
