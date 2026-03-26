import { Router } from "express";
import CategoriaController from "../controllers/CategoriasController";
import { validateRequest } from "../middleware/validateRequest";
import { createUpdateCategoriaDto } from "../dtos/CategoriaDto";
import { IdParamDto } from "../dtos/IdParamDto";
import { checkJWT } from "../middleware/jwt";
import { checkRole } from "../middleware/role";
import { UserRole } from "../enums/enums";

const ROUTES = Router();
debugger;
ROUTES.get("/", CategoriaController.getAllCategorias);
ROUTES.get(
  "/:id",
  [
    checkJWT,
    checkRole([UserRole.ADMIN]),
    validateRequest({ params: IdParamDto }),
  ], //validacciones de middleware
  CategoriaController.getCategoriaById,
);
ROUTES.post(
  "/",
  [checkJWT, validateRequest({ body: createUpdateCategoriaDto })], //validacciones de middleware
  CategoriaController.createCategorias,
);

ROUTES.patch(
  "/:id",
  validateRequest({ params: IdParamDto, body: createUpdateCategoriaDto }),
  CategoriaController.updateCategorias,
);

ROUTES.delete(
  "/:id",
  validateRequest({ params: IdParamDto }),
  CategoriaController.deleteCategorias,
);

export default ROUTES;
