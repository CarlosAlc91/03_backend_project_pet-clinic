//se hace la creacion de finder-users.service.ts para crear un servicio por metodo

//crear clase toda la logica referente para buscar usuarios
export class FinderUsersService {
  //metodo asincrono
  async execute() {
    //se va a retornar un arreglo de usuarios
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
  }
}
