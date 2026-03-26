import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/Usuario';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export class AuthController {
  // login and register methods would go here

  static login = async (req: Request, res: Response) => {
    try {
      //manejo de errores
      const { username, password } = req.body;
      //lógica de autenticación aquí (verificar usuario y contraseña)

      const repo = AppDataSource.getRepository(Usuario);
      //buscar el usuario por su nombre de usuario (correo electrónico)
      const user = await repo.findOneBy({ username });

      if (!user) {
        return res.status(401).json({ message: 'Datos incorrectos al auntenticarse' });
      }

      //verificar la contraseña (esto debería hacerse con hashing en un caso real)
      if (!user.checkPassword(password)) {
        return res.status(401).json({ message: 'Datos incorrectos al auntenticarse' });
      }

      //devolver token o sesión (no implementado aquí)
      //PAYLOAD DEL TOKEN
      const token = jwt.sign({ userId: user.id }, config.jwtSecret, {
        expiresIn: '3m',
      });

      //devolver token por header
      res.setHeader('token', token);

      return res.status(200).json({ message: 'Autenticación exitosa', role: user.role });
    } catch (error) {
      return res.status(500).json({ message: 'Error al autenticarse.' });
    }
  };
}
