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
  async findUser(username?: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
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
