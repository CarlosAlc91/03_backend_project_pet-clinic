//se hace la creacion de finder-users.service.ts para crear un servicio por metodo

import { User } from "../../../data/postgres/models/user.model.js";

//crear clase toda la logica referente para buscar usuarios
export class FinderUsersService {
  //metodo asincrono execute que va a ser usado dentro de controller.ts

  async execute() {
    //se va a retornar un arreglo de usuarios
    /*
    return [
      {
        id: 1,
        name: "Carlos",
        email: "Carlos@test.com",
      },
      {
        id: 2,
        name: "Karen",
        email: "karen@test.com",
      },
    ];
    */
    //This will impact in database

    try {
      return await User.find({
        //Here we're showing only properties we need.
        select: ["id", "fullname", "email", "phone_number", "role"],
        //Here we're showing only users with status: true
        where: {
          status: true,
        },
      });
    } catch (error) {
      console.error("Error in FinderUsersService");
      throw new Error("An error ocurred while searching for user");
    }
  }
}
