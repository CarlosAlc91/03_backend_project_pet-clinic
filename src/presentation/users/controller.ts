/**
 *
 * clase controller cada uno de los metodos que va a necesitar cada una de las turas para funcionar
 *
 */

import type { Request, Response } from "express";

export class UserController {
  constructor() {}

  //metodo findAll usando metodo de flecha
  findAll = (req: Request, res: Response) => {
    //retorna una respuesta con status 200
    return res.status(200).json({
      message: "GET request from controller.ts",
    });
  };

  //metodo register an user
  register = (req: Request, res: Response) => {
    return res.status(200).json({
      message: "POST request from controller.ts (user registered)",
    });
  };

  //metodo para encontrar a un usuario
  findOne = (req: Request, res: Response) => {
    //toda la informacion del usuario viene del req:Request, ya que es informacion que envia el cliente
    //se hace una destructuracion
    const { id } = req.params;

    return res.status(200).json({
      //agregamos id a la respuesta
      id: id,
      message: "GET request from controller.ts (user found)",
    });
  };
  //metodo patch para hacer updates
  update = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(200).json({
      id: id,
      message: "PATCH request from controlles.ts (user updated)",
    });
  };

  //metodo delete para eliminar informacion
  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(200).json({
      id: id,
      message: "DELETE request from controller.ts (user deleted)",
    });
  };
}
