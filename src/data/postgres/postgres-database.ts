import { DataSource } from "typeorm";
import { User } from "./models/uner.model.js";
import { Pets } from "./models/pets.model.js";
import { Doctor } from "./models/doctor.model.js";
import { Appointments } from "./models/appointments.model.js";
import { Species } from "./models/species.model.js";

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
      entities: [User, Pets, Doctor, Appointments, Species],
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
