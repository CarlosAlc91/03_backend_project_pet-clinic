//We're going to be calling all environment variables
//process.loadEnvFile() -> asi tambien podemos llamar las variables de entorno

import "dotenv/config";

//with env-var we can validate our environment variables
import env from "env-var";

export const envs = {
  //THIS IS FROM .env file
  //.required - is required
  //.asPortNumber - valid port
  PORT: env.get("PORT").required().asPortNumber(),
  DATABASE_USERNAME: env.get("DATABASE_USERNAME").required().asString(),
  DATABASE_PASSWORD: env.get("DATABASE_PASSWORD").required().asString(),
  DATABASE_HOST: env.get("DATABASE_HOST").required().asString(),

  DATABASE_PORT: env.get("DATABASE_PORT").required().asString(),

  DATABASE_NAME: env.get("DATABASE_NAME").required().asString(),
};
