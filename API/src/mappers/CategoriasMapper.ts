import { CategoriaResponseDto } from "../dtos/CategoriaDto";
import { Categorias } from "../entities/Categorias";

// Clase para mapear entre la entidad Categorias y el DTO CategoriaResponseDto
export class CategoriaMapper {
  //metodo para mapear una entidad a un DTO
  static toResponseDto(entity: Categorias): CategoriaResponseDto {
    return {
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion || undefined,
    };
  }

  //metodo para mapear una lista de entidades a una lista de DTOs
  static toResponseDtoList(entities: Categorias[]): CategoriaResponseDto[] {
    //usar el metodo toResponseDto para cada entidad
    return entities.map(this.toResponseDto);
  }
}
