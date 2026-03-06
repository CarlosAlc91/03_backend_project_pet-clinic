//routes.ts es para crear todas las rutass o endpoints

import { Router, type Request, type Response } from "express";
import { UserRoutes } from "./users/routes.js";

//creacion de clase approutes
export class AppRoutes {
  //metodo statico y va a retornar : Router que va a ser importado de express
  static get routes(): Router {
    //constante router asignando Router importado de express
    const router = Router();
    /**
 * //definicion de rutas con metodos http
    router.get("/", (req: Request, res: Response) => {
      //siempre que se envie una respuesta res: hay que poner un return
      return res.status(200).json({
        message: "GET requewrt to the homepage from teh appRoute class",
      });
    });
 * 
 */

    /**
     * ruta de usuarios y se manda a llamar a la clase de UserRoutes.routes, que ejecuta el metodo routes() de la clase UserRouter
     * aqui se mandan a llamar a todas las rutas de usuario
     * ya no se tiene que crear otra ruta users, solo en el browser se cambia la ruta del usuario
     * router.get("/user_id", en el web se pone localhost:port/users/user_id
     */
    router.use("/users", UserRoutes.routes);

    //se retorna la constante router
    return router;
  }
}
