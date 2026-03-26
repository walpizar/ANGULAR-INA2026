import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcryptjs";
import { UserRole } from "../enums/enums";

@Entity({ name: "tbUsuarios" })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false, unique: true })
  username: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    nullable: false,
    default: UserRole.USER,
  })
  role: UserRole;

  hashPassword(): void {
    // Aquí puedes implementar la lógica para hashear la contraseña
    // Por ejemplo, usando bcrypt:
    // this.password = bcrypt.hashSync(this.password, saltRounds);

    // saltRounds es el número de rondas de salting que deseas aplicar
    const saltRounds = bcrypt.genSaltSync(10);

    // Hashear la contraseña
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }

  // Método para verificar la contraseña
  checkPassword(unhashedPassword: string): boolean {
    // Aquí puedes implementar la lógica para verificar la contraseña
    // Por ejemplo, usando bcrypt:
    return bcrypt.compareSync(unhashedPassword, this.password);
  }
}
