import { UsuarioController } from "../controllers/UsuarioController";
import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { createUpateUsuarioDto } from "../dtos/UsuarioDto";

const ROUTES = Router();

ROUTES.post(
  "/",
  validateRequest({ body: createUpateUsuarioDto }),
  UsuarioController.createUsuarios,
);

export default ROUTES;
