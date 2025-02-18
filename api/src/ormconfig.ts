import { DataSource } from "typeorm";
import { User, Ejemplo } from "./models";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Ejemplo],
  synchronize: true, // Solo para desarrollo; usa migrations para producción
});
