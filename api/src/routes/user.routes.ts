// src/routes/user.routes.ts
import { Router } from "express";
import { UserController } from "@/controllers";

const router = Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);

export default router;
