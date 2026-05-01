//We're going to be calling all environment variables
//process.loadEnvFile() -> asi tambien podemos llamar las variables de entorno

import "dotenv/config";

//with env-var we can validate our environment variables
import { get } from "env-var";

export const envs = {
  //THIS IS FROM .env file
  //.required - is required
  //.asPortNumber - valid port
  PORT: get('PORT').required().asPortNumber()
}
