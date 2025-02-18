import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs/promises";
import { AppDataSource } from "@/ormconfig";
import { UserRoutes, EjemploRoutes } from "@/routes";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3000;

app.use(express.json());
app.use(cors());

// Conectar a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

app.get("/", (_: Request, res: Response) => {
  res.send("Hello World!");
});

async function setupSwagger() {
  try {
    const swaggerDocument = JSON.parse(
      await fs.readFile(path.join(__dirname, "docs", "swagger.json"), "utf-8"),
    );
    app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (error) {
    console.error("Error loading Swagger document:", error);
  }
}

setupSwagger();

app.use("/api", EjemploRoutes);
app.use("/api/auth", UserRoutes);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
