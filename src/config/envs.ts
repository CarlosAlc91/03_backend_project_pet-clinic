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
  NODE_ENV: env.get("NODE_ENV").required().asString(),
  DATABASE_USERNAME: env.get("DATABASE_USERNAME").required().asString(),
  DATABASE_PASSWORD: env.get("DATABASE_PASSWORD").required().asString(),
  DATABASE_HOST: env.get("DATABASE_HOST").required().asString(),

  DATABASE_PORT: env.get("DATABASE_PORT").required().asPortNumber(),

  DATABASE_NAME: env.get("DATABASE_NAME").required().asString(),
  JWT_KEY: env.get("JWT_KEY").required().asString(),
  JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),

  MAILER_SEREVICE: env.get("MAILER_SEREVICE").required().asString(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
  WEBSERVICE_URL: env.get("WEBSERVICE_URL").required().asString(),
  SEND_MAIL: env.get("SEND_MAIL").required().asBool(),
};
