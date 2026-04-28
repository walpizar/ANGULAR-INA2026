import { Request, Response } from 'express';
import { Categorias } from '../entities/Categorias';
import { AppDataSource } from '../data-source';
import { CategoriaMapper } from '../mappers/CategoriasMapper';
import { Not } from 'typeorm/find-options/operator/Not.js';

class CategoriaController {
  // Métodos del controlador para manejar categorías

  static getAllCategorias = async (req: Request, res: Response) => {
    try {
      //acceder a la base de datos y obtener las categorías
      const repo = AppDataSource.getRepository(Categorias);

      //obtener solo las categorías activas
      const listaCategorias = await repo.find({ where: { estado: true } });

      //verificar si hay categorías, de lo contrario enviar un 404
      if (listaCategorias.length === 0) {
        return res.status(404).json({ message: 'No hay categorías registradas' });
      }

      //enviar la lista de categorías como respuesta
      return res.status(200).json(CategoriaMapper.toResponseDtoList(listaCategorias));

      //manejo de errores
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener las categorías' });
    }
  };

  static getCategoriaById = async (req: Request, res: Response) => {
    try {
      //DESTRUCTURIZAR EL ID DE LOS PARÁMETROS
      const { id } = req.params;

      //acceder al repositorio de categorías
      const repo = AppDataSource.getRepository(Categorias);
      //buscar la categoría por id y estado activo
      const categoria = await repo.findOneBy({ id: Number(id), estado: true });

      //verificar si la categoría existe
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      //enviar la categoría como respuesta
      return res.status(200).json(CategoriaMapper.toResponseDto(categoria));
    } catch (error) {
      return res.status(500).json({ message: 'Error al obtener la categoría' });
    }
  };

  static createCategorias = async (req: Request, res: Response) => {
    try {
      console.log('metodo');
      //obtener los datos del cuerpo de la solicitud
      //destructurizar nombre y descripción
      const { nombre, descripcion } = req.body;

      //reglas de negocio: el nombre debe ser único
      const repo = AppDataSource.getRepository(Categorias);
      const categoriaExistente = await repo.findOneBy({
        nombre: nombre,
        estado: true,
      });
      if (categoriaExistente) {
        return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
      }

      console.log('Datos recibidos para crear categoría:', { nombre, descripcion });

      //crear una nueva instancia de Categoría
      const nuevaCategoria = repo.create({
        nombre: nombre,
        descripcion: descripcion,
        estado: true, //por defecto la categoría está activa
      });
      //guardar la nueva categoría en la base de datos
      await repo.save(nuevaCategoria);

      return res.status(201).json(CategoriaMapper.toResponseDto(nuevaCategoria));
    } catch (error) {
      return res.status(500).json({ message: 'Error al crear la categoría' });
    }
  };

  static updateCategorias = async (req: Request, res: Response) => {
    try {
      //DESTRUCTURIZAR EL ID DE LOS PARÁMETROS
      const { id } = req.params;
      const { nombre, descripcion } = req.body;

      //ACCEDER AL REPOSITORIO DE CATEGORÍAS
      const repo = AppDataSource.getRepository(Categorias);
      const categoria = await repo.findOneBy({ id: Number(id) });

      //VERIFICAR SI LA CATEGORÍA EXISTE
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      //REGLA DE NEGOCIO: EL NOMBRE DEBE SER ÚNICO
      const categoriaExistente = await repo.findOne({
        where: {
          nombre: nombre,
          estado: true,
          id: Not(Number(id)), // ← Excluye el ID actual
        },
      });

      if (categoriaExistente) {
        return res.status(400).json({ message: 'Ya existe una categoría con ese nombre' });
      }

      //ACTUALIZAR LOS CAMPOS DE LA CATEGORÍA
      categoria.nombre = nombre;
      categoria.descripcion = descripcion;

      //GUARDAR LOS CAMBIOS EN LA BASE DE DATOS
      await repo.save(categoria);

      //ENVIAR LA CATEGORÍA ACTUALIZADA COMO RESPUESTA
      return res.status(200).json(CategoriaMapper.toResponseDto(categoria));
    } catch (error) {
      return res.status(500).json({ message: 'Error al modificar la categoría' });
    }
  };

  static deleteCategorias = async (req: Request, res: Response) => {
    try {
      //DESTRUCTURIZAR EL ID DE LOS PARÁMETROS
      const { id } = req.params;

      //ACCEDER AL REPOSITORIO DE CATEGORÍAS
      const repo = AppDataSource.getRepository(Categorias);
      const categoria = await repo.findOneBy({ id: Number(id) });
      //VERIFICAR SI LA CATEGORÍA EXISTE
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      //ELIMINAR LA CATEGORÍA (ESTABLECER ESTADO A FALSO)
      categoria.estado = false;
      //GUARDAR LOS CAMBIOS EN LA BASE DE DATOS
      await repo.save(categoria);

      //ENVIAR RESPUESTA DE ÉXITO
      return res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
      return res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
  };
}
export default CategoriaController;
