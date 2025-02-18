import { Request, Response } from "express";
import { AppDataSource } from "@/ormconfig";
import { Ejemplo } from "@/models";

export class EjemploController {
  /**
   * Obtiene todos los ejemplos de la base de datos y los devuelve en un objeto JSON
   * @param req objecto request de la peticion
   * @param res objeto response de la peticion
   * @returns Devuelve un objeto JSON con los ejemplos
   */
  static async getEjemplos(_: Request, res: Response): Promise<Response> {
    try {
      const ejemploRepository = AppDataSource.getRepository(Ejemplo);
      const ejemplos = await ejemploRepository.find();
      return res.json(ejemplos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Obtiene un ejemplo por su id
   * @param req objeto request de la peticion
   * @param res objeto response de la peticion
   * @returns Devuelve un objeto JSON con el ejemplo
   */
  static async getEjemploById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const ejemploRepository = AppDataSource.getRepository(Ejemplo);
      const ejemplo = await ejemploRepository.findOne({
        where: { id: parseInt(id) },
      });
      if (!ejemplo) {
        return res.status(404).json({ error: "Ejemplo not found" });
      }
      return res.json(ejemplo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Crea un ejemplo en la base de datos
   * @param req objeto request de la peticion
   * @param res objeto response de la peticion
   * @returns Devuelve un objeto JSON con el ejemplo creado
   */
  static async createEjemplo(req: Request, res: Response): Promise<Response> {
    try {
      const { name, number } = req.body;
      const ejemploRepository = AppDataSource.getRepository(Ejemplo);
      const ejemplo = new Ejemplo();
      ejemplo.name = name;
      ejemplo.number = number;
      await ejemploRepository.save(ejemplo);
      return res.json(ejemplo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Actualiza un ejemplo en la base de datos
   * @param req objeto request de la peticion
   * @param res objeto response de la peticion
   * @returns Devuelve un objeto JSON con el ejemplo actualizado
   */
  static async updateEjemplo(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, number } = req.body;
      const ejemploRepository = AppDataSource.getRepository(Ejemplo);
      const ejemplo = await ejemploRepository.findOne({
        where: { id: parseInt(id) },
      });
      if (!ejemplo) {
        return res.status(404).json({ error: "Ejemplo not found" });
      }
      ejemplo.name = name;
      ejemplo.number = number;
      await ejemploRepository.save(ejemplo);
      return res.json(ejemplo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * Elimina un ejemplo de la base de datos
   * @param req objeto request de la peticion
   * @param res objeto response de la peticion
   * @returns Devuelve un objeto JSON con el mensaje de eliminacion
   */
  static async deleteEjemplo(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const ejemploRepository = AppDataSource.getRepository(Ejemplo);
      const ejemplo = await ejemploRepository.findOne({
        where: { id: parseInt(id) },
      });
      if (!ejemplo) {
        return res.status(404).json({ error: "Ejemplo not found" });
      }
      await ejemploRepository.remove(ejemplo);
      return res.json({ message: "Ejemplo deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
