import { DataSource } from "typeorm";
import { User } from "./models/user.model.js";
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

/**
 * Class to manage the connection to a PostgreSQL database using TypeORM.
 *
 * @remarks
 * This class configures and manages the database connection, including the initialization of
 * the User, Pet, Doctor, Specie, and Appointment entities.
 *
 * The connection is configured to synchronize the database schema and uses SSL with
 * rejectUnauthorized: false to prevent errors in development environments.
 *
 * @example
 * ```typescript
 * const database = new PostgresDatabase({
 * host: 'localhost',
 * port: 5432,
 * username: "postgres",
 * password: "password",
 * database: "database name"
 * })
 *
 * database.connect().then(() => {}).catch((error) => console.error(error))
 * ```
 */
export class PostgresDatabase {
  public datasource: DataSource;

  /**
   * Creates a new instance of the PostgreSQL connection.
   *
   * @param options - Configuration options for the database connection.
   */
  constructor(options: Options) {
    // This is from TypeORM and our interface, which is why we use options.host
    this.datasource = new DataSource({
      type: "postgres",
      host: options.host,
      port: options.port,
      username: options.username,
      password: options.password,
      database: options.database,
      synchronize: true,
      //logging: true,
      // Here we include our entities from their respective models
      entities: [User, Pets, Doctor, Appointments, Species],

      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  /**
   * Initializes the database connection.
   * * @remarks
   * This method must be called to establish the database connection.
   * It logs a message to the console indicating whether the connection was successful.
   * * @returns
   * A promise that resolves when the connection is successful and rejects if an error occurs.
   */
  async connect() {
    try {
      await this.datasource.initialize();
      console.log("Database connected");
    } catch (error) {
      console.error(error);
      //throw new Error("error");
    }
  }
}
