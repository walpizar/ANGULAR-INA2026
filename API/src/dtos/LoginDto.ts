import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class loginDto {
  @IsEmail({}, { message: "Datos incorrectos al auntenticarse" })
  @IsNotEmpty({ message: "Datos incorrectos al auntenticarse" })
  username: string;

  @IsNotEmpty({ message: "Datos incorrectos al auntenticarse" })
  password: string;
}
