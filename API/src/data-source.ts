import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/Usuario";
import { Categorias } from "./entities/Categorias";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Utn123**", // ajusta
  database: "miappdb", // crea esta DB
  synchronize: false, // solo desarrollo
  logging: false,
  entities: [Usuario, Categorias],
});
