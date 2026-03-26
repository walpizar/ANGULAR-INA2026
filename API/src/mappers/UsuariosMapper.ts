import { CategoriaResponseDto } from "../dtos/CategoriaDto";
import { UsuarioResponseDto } from "../dtos/usuarioDto";
import { Categorias } from "../entities/Categorias";
import { Usuario } from "../entities/Usuario";

// Clase para mapear entre la entidad Categorias y el DTO CategoriaResponseDto
export class UsuarioMapper {
  //metodo para mapear una entidad a un DTO
  static toResponseDto(entity: Usuario): UsuarioResponseDto {
    return {
      id: entity.id,
      username: entity.username,
      role: entity.role,
      password: entity.password,
    };
  }

  //metodo para mapear una lista de entidades a una lista de DTOs
  static toResponseDtoList(entities: Usuario[]): UsuarioResponseDto[] {
    //usar el metodo toResponseDto para cada entidad
    return entities.map(this.toResponseDto);
  }
}
