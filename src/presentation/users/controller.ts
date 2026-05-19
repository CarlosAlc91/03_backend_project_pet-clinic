/**
 *
 * clase controller cada uno de los metodos que va a necesitar cada una de las turas para funcionar
 *
 */

import type { Request, Response } from "express";
import { FinderUsersService } from "./services/finder-users.service.js";
import { RegisterUserService } from "./services/register-user.service.js";
import type { FinderUserService } from "./services/finder-user.service.js";
import type { UpdateUserService } from "./services/update-user.service.js";
import type { DeleteUserService } from "./services/delete-user.service.js";

export class UserController {
  constructor(
    //se hace inyeccion de dependencias para traer a la clase FinderUser de finder-users.service.ts
    private readonly finderUsers: FinderUsersService,
    private readonly registerUser: RegisterUserService,
    private readonly finderUser: FinderUserService,
    private readonly updateUser: UpdateUserService,
    private readonly deleteUser: DeleteUserService,
  ) {}
  //metodo findAll usando metodo de flecha
  findAll = (req: Request, res: Response) => {
    /**
     * //retorna una respuesta con status 200
     * return res.status(200).json({
      message: "GET request from controller.ts",
    });
     */

    //se manda a llamar la dependencia finderUser
    //.execute es el metodo que se creo en finder-users.service.ts
    this.finderUsers
      .execute()
      .then((users) => res.status(200).json(users))
      .catch((err) => res.status(500).json({ mesage: err.message }));
  };

  //metodo register an user
  register = (req: Request, res: Response) => {
    /**
     * return res.status(200).json({
      message: "POST request from controller.ts (user registered)",
    });
     * 
     */
    //console.log(req.body);
    this.registerUser
      //.execute es el metodo que se creo en register-users.service.ts
      .execute(req.body)
      //cuando son registros o creacion de informacion se pone status 201
      .then((message) => res.status(201).json(message))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  //metodo para encontrar a un usuario
  findOne = (req: Request, res: Response) => {
    //toda la informacion del usuario viene del req:Request, ya que es informacion que envia el cliente
    //se hace una destructuracion
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "User ID is required" });
    }

    this.finderUser
      .execute(id)
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  //metodo patch para hacer updates
  update = (req: Request, res: Response) => {
    const { id } = req.params;
    this.updateUser
      .execute(id as string, req.body)
      //we're receiving the user and then we sent the updated user
      .then((user) => res.status(200).json(user))
      .catch((err) => res.status(500).json({ message: err.message }));
  };

  //metodo delete para eliminar informacion
  delete = (req: Request, res: Response) => {
    /**
     * 
     * const { id } = req.params;
    return res.status(200).json({
      id: id,
      message: "DELETE request from controller.ts (user deleted)",
    });
     */

    this.deleteUser
      .execute()
      .then((message) => res.status(200).json(message))
      .catch((err) => res.status(500).json({ message: err.message }));
  };
}

//9 - 1:05
