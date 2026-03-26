import { Router } from "express";
import categorias from "./categorias";
import auth from "./auth";
import usuarios from "./usuario";

const ROUTES = Router();

ROUTES.use("/auth", auth);
ROUTES.use("/categorias", categorias);
ROUTES.use("/clientes", categorias);
ROUTES.use("/productos", categorias);
ROUTES.use("/usuarios", usuarios);

export default ROUTES;
