//routes.ts es para crear las rutass o endpoints

import { Router, type Request, type Response } from "express";

//creacion de clase approutes
export class AppRoutes {
  //metodo statico y va a retornar : Router que va a ser importado de express
  static get routes(): Router {
    //constante router asignando Router importado de express
    const router = Router();

    //definicion de rutas con metodos http
    router.get("/", (req: Request, res: Response) => {
      //siempre que se envie una respuesta res: hay que poner un return
      return res.status(200).json({
        message: "GET requewrt to the homepage from teh appRoute class",
      });
    });

    //se retorna la constante router
    return router;
  }
}
