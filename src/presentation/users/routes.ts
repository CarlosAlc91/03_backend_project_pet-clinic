//rutas para los usuarios

//siemrpe importar express from express
import { Router, type Request, type Response } from "express";

//creacion de cclase UserRoutes
export class UserRoutes {
  //metodo estatico getter con tipado: Router
  static get routes(): Router {
    //constante router que guarda Router() de express
    const router = Router();

    //creacion de ruta para userroutes
    router.get("/", (req: Request, res: Response) => {
      return res.status(200).json({
        message: "GET response from UserRoutes.ts",
      });
    });

    router.get("/user_id", (req: Request, res: Response) => {
      return res.status(200).json({
        message: "User ID is 123",
      });
    });
    //retornamos la constante router que tiene el Router de express
    return router;
  }
}
