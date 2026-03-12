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
}
