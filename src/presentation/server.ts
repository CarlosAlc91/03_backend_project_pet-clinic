//aqui es donde se va a configurar realmente la aplicacion
//se va a configurar el servidor de express

//interfaz que recibe el puerto
//una interfaz es el tipado de un objeto
interface Options {
  port: number;
  //se define la propiedad routes que viene de routes.ts que va a ser definidad en la clase
  routes: Router;
}

//siempre se tiene que primero importar la libreria express
import express, { Router, type Request, type Response } from "express";

export class Server {
  //propiedades
  private readonly app = express();
  private readonly PORT: number;

  //se crea otra propiedad qeu viene de routes.ts y es definida en interface options
  private readonly routes: Router;

  //constructor recibe el parametro de la interfaz Options
  constructor(options: Options) {
    //la propiedad PORT = recibe el parametro del constructor port
    this.PORT = options.port;

    //propiedad de la clase y le asigno lo que venga en options.routes
    this.routes = options.routes;
  }

  //metodo asincrono encargado de inicializar la app
  //metodo asincrono porque se va a tener controlar desde afuera de server.ts
  async start() {
    //middleware que le ensena a express a leer los .json ya que vamos a recibir informacion en json
    this.app.use(express.json());
    //middleware que le ensena a express a leer urlencoded
    this.app.use(express.urlencoded({ extended: true }));

    /*

    //esto se puede omitir porque las rutas ya fueron declaradas en routes.ts

this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        message: "GET Method from server.ts",
      });
    });


*/

    //esto es lo que realmte se deberia de declarar porque las rutas ya fueron declaradas
    this.app.use(this.routes);

    //metodo HTTP para escuchart y ver que si efectivamente este funcionando el server
    this.app.listen(this.PORT, () => {
      console.log(`Second server is running on port ${this.PORT} 😎`);
    });
  }
}
