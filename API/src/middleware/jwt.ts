import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import * as jwt from "jsonwebtoken";

export const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  // Lógica para verificar el JWT
  // obtener el token del encabezado key token
  const token = req.headers["token"] as string | undefined;

  // verificar si el token existe
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  // verificar y decodificar el token
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: number };
    // agregar el usuario decodificado al objeto de solicitud

    (req as any).userId = decoded.userId;

    // Crear un nuevo token con tiempo de expiración renovado
    const refreshToken = jwt.sign(
      { userId: decoded.userId },
      config.jwtSecret,
      {
        expiresIn: "3m",
      },
    );

    // Enviar el nuevo token en el encabezado de la respuesta
    res.setHeader("token", refreshToken);
  } catch (error) {
    return res.status(401).json({ message: " Not authorized" });
  }
  next();
};
