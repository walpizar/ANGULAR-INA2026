import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";

export const checkRole = (rolesPermitidos: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //obtner del request el id del usuario
    const userId = (req as any).userId; //suponiendo que el rol del usuario se almacena en req.role
    //validar el userID
    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    //obtener el usuario de la base de datos
    const repo = AppDataSource.getRepository(Usuario);

    const user = await repo.findOneBy({ id: userId });

    //validar si el usuario existe
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    //verificar si el rol del usuario está en la lista de roles permitidos
    if (!rolesPermitidos.includes(user.role)) {
      console.log("aqio");
      return res.status(403).json({ message: "Not authorized" });
    }

    next();
  };
};
