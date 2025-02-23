import prisma from '../config/db'
import { User } from "../models/User";

export class UserRepository {
  /**
   * Obtener todos los usuarios
   * @returns Lista de usuarios
   */
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  /**
   * Buscar un usuario por su email
   * @param email - Email del usuario
   * @returns Usuario encontrado o null si no existe
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  /**
   * Crear un nuevo usuario
   * @param name - Nombre del usuario
   * @param email - Email del usuario
   * @param password - Contraseña (debe estar encriptada antes de llamar este método)
   * @returns Usuario creado
   */
  async createUser(name: string, email: string, password: string): Promise<User> {
    return prisma.user.create({
      data: { name, email, password },
    });
  }

  /**
   * Actualizar un usuario (Ej: desactivarlo)
   * @param email - Email del usuario
   * @param data - Datos a actualizar
   * @returns Usuario actualizado
   */
  async updateUser(email: string, data: Partial<User>): Promise<User | null> {
    return prisma.user.update({
      where: { email },
      data,
    });
  }
}
