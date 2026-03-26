import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";
export class UsuarioController {
  // user-related methods would go here

  static createUsuarios = async (req: Request, res: Response) => {
    try {
      const { username, password, role } = req.body;

      //reglas de negocio para crear un usuario

      const repo = AppDataSource.getRepository(Usuario);

      //verificar si el username ya existe
      const existingUser = await repo.findOneBy({ username });

      if (existingUser) {
        return res
          .status(400)
          .json({
            message: "El nombre de usuario (correo electrónico) ya existe",
          });
      }

      //hashear la contraseña antes de guardarla (opcional, pero recomendado)

      //crear el nuevo usuario
      const newUser = repo.create({ username, password, role });

      //enviar a hashear la contraseña
      newUser.hashPassword();

      await repo.save(newUser);

      return res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear el usuario" });
    }
  };
}
