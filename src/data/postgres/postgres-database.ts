import { error } from "node:console";
import { DataSource } from "typeorm";

interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  public datasource: DataSource;

  constructor(options: Options) {
    this.datasource = new DataSource({
      type: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      synchronize: true,
      entities: [],
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  //metodo asincrono
  async connect() {
    try {
      await this.datasource.initialize();
      console.log("Bse de datos conectada");
    } catch (error) {
      console.error(error);
    }
  }
}

//7 1:48
