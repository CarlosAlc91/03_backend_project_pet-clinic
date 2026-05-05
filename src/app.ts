import "reflect-metadata";

import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";
import { envs } from "./config/envs.js";
import { PostgresDatabase } from "./data/index.js";

/*

console.log("I'm the best");

//importart de libreria usando type: module
import express, { type Request, type Response } from "express";

//inicializa app
const app = express();
//app.use(express.json()); nos ayuda a que express pueda leer objetos json
app.use(express.json());
const PORT = 3000;

//definicion de rutas con metodos http
//app.get("/", (request, response) => {}); se pasa como segundo parametro el callback => funcion qeu pasa como parametro a ora funcion
//los parameetros del callback se tipan pero importando de express
app.get("/", (req: Request, res: Response) => {
  //entre las llaves se coloca todo el codigo que va a hacer el endpoint(url)
  res.status(200).json({
    message: "Get resquest received",
  });
});

//metodo post sirve para ver lo que "postea" el usuario.
app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  //res.status muestra un json con el status de la respuesta
  res.status(200).json({
    message: "Post request received",
  });
});

//la app se pone a escuchar(por un puerto, se recibe un callback como segundo parametro)
app.listen(PORT, () => {
  console.log(`I the server am listening in port ${PORT}`);
});

*/
async function main() {
  //We export and instantiate the class we created in postgres-databese.ts
  const postgres = new PostgresDatabase({
    //Here we're calling the envs.ts
    username: envs.DATABASE_USERNAME,
    password: envs.DATABASE_PASSWORD,
    host: envs.DATABASE_HOST,

    //This is database port from envs.ts
    port: envs.DATABASE_PORT,
    database: envs.DATABASE_NAME,
  });

  //Here we connect to the postgres-database.ts database using the connect method
  //#We're using await since we used an async method in postgres-database.t
  await postgres.connect();

  const server = new Server({
    port: envs.PORT,
    //mandamos a llamar routes
    routes: AppRoutes.routes,
  });

  await server.start();
}

main();
