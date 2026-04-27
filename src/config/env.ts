//We're going to be calling all environment variables

import "dotenv/config";

//sae pueden validar las variables de entorno
import { get } from "env-var";

export const envs = {

  PORT: get("PORT").required().asPortNumber()
}
