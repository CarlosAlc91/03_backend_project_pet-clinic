//rutas para los usuarios

//siemrpe importar express from express
import { Router, type Request, type Response } from "express";
import { UserController } from "./controller.js";

//creacion de cclase UserRoutes
export class UserRoutes {
  //metodo estatico getter con tipado: Router
  static get routes(): Router {
    //constante router que guarda Router() de express
    const router = Router();

    /**
     * Una vez creado el controlador, ya no se necesitan el req y res
     * ya que se va a mandar a llamar el controlador
     * //creacion de ruta para userroutes
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
     * 
     */

    //para mandar a llamar los controladores o metodos se tienen que instanciar primiero
    const controller = new UserController();
    //llamada del controlador, osea los metodos de los controladore
    router.get("/", controller.findAll);

    router.post("/register", controller.register);
    //metodo para encontrar a un usuario por id
    router.get("/:id", controller.findOne);

    //patch hay que saber que vamos a actualizar
    router.patch("/:id", controller.update);

    //detele, para eliminar informacion del usuario o al usuario
    router.delete("/:id", controller.delete);

    //retornamos la constante router que tiene el Router de express
    return router;
  }
}
