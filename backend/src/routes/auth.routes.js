import { Router } from "express";
import { Registrar } from "../controllers/auth.controller.js";

const router = Router();

router.post('/registro', Registrar);

export default router;