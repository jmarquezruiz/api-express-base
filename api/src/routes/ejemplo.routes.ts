import { Router } from "express";
import { EjemploController } from "@/controllers";
import { verifyToken } from "@/utils/auth";

const router = Router();

router.get("/ejemplo", verifyToken, EjemploController.getEjemplos);
router.get("/ejemplo/:id", verifyToken, EjemploController.getEjemploById);
router.post("/ejemplo", verifyToken, EjemploController.createEjemplo);
router.put("/ejemplo/:id", verifyToken, EjemploController.updateEjemplo);
router.delete("/ejemplo/:id", verifyToken, EjemploController.deleteEjemplo);

export default router;