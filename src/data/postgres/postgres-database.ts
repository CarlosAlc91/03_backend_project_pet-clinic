import { DataSource } from "typeorm";
import { User } from "./models/uner.model.js";

//interface created to be passed to our constructor
interface Options {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export class PostgresDatabase {
  public datasource: DataSource;

  //these options are from our interface
  constructor(options: Options) {
    //this is from typeORM and our interface that's why we have options.host
    this.datasource = new DataSource({
      type: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      synchronize: true,
      //in here we bring our entities from user.model.ts
      entities: [User],
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  //metodo asincrono this will show either db is connected or not
  async connect() {
    try {
      await this.datasource.initialize();
      console.log("Database connected");
    } catch (error) {
      console.error(error);
    }
  }
}

//7 1:48
