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
   * Obtener usuario
   * @param username | undefined - Nombre del usuario
   * @returns Lista de usuarios
   */
  async findUser(username?: string): Promise<User | User[] | null> {
    if (!username) return prisma.user.findMany();

    // Busca un usuario por username
    return prisma.user.findFirst({
      where: { username }
    });
  }
  
  /**
   * Crear un nuevo usuario
   * @param name - Nombre de pila del usuario
   * @param email - Email del usuario
   * @param password - Contraseña (debe estar encriptada antes de llamar este método)
   * @param username - Nombre de usuario
   * @returns Usuario creado
   */
  async createUser(name: string, email: string, password: string, username: string): Promise<User> {
    return prisma.user.create({
      data: { name, email, password, username },
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
