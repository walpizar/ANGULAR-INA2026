import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from "class-validator";
import { UserRole } from "../enums/enums";

//DTO para la respuesta de usuario
export class UsuarioResponseDto {
  id!: number;
  username!: string;
  password!: string;
  role!: string;
}
//aplicar validaciones a los campos de usuario con class-validator
export class createUpateUsuarioDto {
  @MinLength(6, {
    message: "El nombre de usuario debe tener al menos 6 caracteres",
  })
  @MaxLength(100, {
    message: "El nombre de usuario no debe exceder los 100 caracteres",
  })
  @IsEmail(
    {},
    { message: "El nombre de usuario debe ser un correo electrónico válido" },
  )
  @IsNotEmpty({ message: "El nombre de usuario es obligatorio" })
  username: string;

  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres" })
  @MaxLength(100, {
    message: "La contraseña no debe exceder los 100 caracteres",
  })
  @IsNotEmpty({ message: "La contraseña es obligatoria" })
  password: string;

  @IsEnum(UserRole, { message: "El rol debe ser un valor válido" })
  role: UserRole;
}
