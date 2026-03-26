import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from "class-validator";

//devolver una categoria
export class CategoriaResponseDto {
  id!: number;
  nombre!: string;
  descripcion?: string;
}

//crear o actualizar una categoria
export class createUpdateCategoriaDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre no debe estar vacío" })
  @MaxLength(100, { message: "El nombre no debe exceder los 100 caracteres" })
  nombre!: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  @MaxLength(500, {
    message: "La descripción no debe exceder los 500 caracteres",
  })
  descripcion?: string;
}

/*
export class updateCategoriaDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre no debe estar vacío" })
  @MaxLength(100, { message: "El nombre no debe exceder los 100 caracteres" })
  nombre!: string;

  @IsOptional()
  @IsString({ message: "La descripción debe ser una cadena de texto" })
  @MaxLength(500, {
    message: "La descripción no debe exceder los 500 caracteres",
  })
  descripcion?: string;
}
*/
