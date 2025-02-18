// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "@/ormconfig";
import { User } from "@/models";
import { generateToken } from "@/utils/auth";
import * as bcrypt from "bcryptjs";

export class UserController {

  /**
   * Función para realizar el login de un usuario
   * Devuelve un objeto de respuesta con el token de autenticación
   * @param req - Objeto de petición
   * @param res - Objeto de respuesta
   * @returns Response - Objeto de respuesta
   */
  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { username },
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Verificar si la contraseña coincide con el hash
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generar y devolver el token
      const token = generateToken({ id: user.id, username: user.username });
      return res.json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
  * Registrar un nuevo usuario en la base de datos
  * @param req objeto request de la peticion
  * @param res objeto response de la peticion
  * @returns Devuelve un objeto JSON con el usuario creado
  */
  static async register(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;

      // Verificar si el usuario ya existe
      const userRepository = AppDataSource.getRepository(User);
      const existingUser = await userRepository.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "Username already taken" });
      }

      // Encriptar la contraseña antes de guardar
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear el nuevo usuario
      const user = new User();
      user.username = username;
      user.password = hashedPassword;

      // Guardar el usuario en la base de datos
      await userRepository.save(user);

      // Responder con el usuario creado
      return res.status(201).json({ message: "User registered successfully", user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
