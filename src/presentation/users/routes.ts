//rutas para los usuarios

//siemrpe importar express from express
import { Router, type Request, type Response } from "express";
import { UserController } from "./controller.js";
import { FinderUsersService } from "./services/finder-users.service.js";
import { RegisterUserService } from "./services/register-user.service.js";
import { FinderUserService } from "./services/finder-user.service.js";
import { UpdateUserService } from "./services/update-user.service.js";
import { DeleteUserService } from "./services/delete-user.service.js";

//creacion de cclase UserRoutes
export class UserRoutes {
  //metodo estatico getter con tipado: Router
  static get routes(): Router {
    //constante router que guarda Router() de express
    const router = Router();

    //se hace la instanciacion o instancia de los servicios finder y register
    //una vez instanciado se pasa a UserController como dependencias
    const finderUsers = new FinderUsersService();
    const registerUser = new RegisterUserService();
    const finderUser = new FinderUserService();
    const updateUser = new UpdateUserService();
    const deleteUser = new DeleteUserService();

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
    const controller = new UserController(
      finderUsers,
      registerUser,
      finderUser,
      updateUser,
      deleteUser,
    );
    //llamada del controlador, osea los metodos de los controladore
    router.get("/", controller.findAll);

    router.post("/register", controller.register);
    //metodo para encontrar a un usuario por id
    router.get("/:id/found", controller.findOne);

    //patch hay que saber que vamos a actualizar
    router.patch("/:id/updated", controller.update);

    //detele, para eliminar informacion del usuario o al usuario
    router.delete("/:id/deleted", controller.delete);

    //retornamos la constante router que tiene el Router de express
    return router;
  }
}

//5 - 1:10
