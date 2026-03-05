//aqui es donde se va a configurar realmente la aplicacion
//se va a configurar el servidor de express

//interfaz que recibe el puerto
//una interfaz es el tipado de un objeto
interface Options {
  port: number;
}

//siempre se tiene que primero importar la libreria express
import express, { type Request, type Response } from "express";

export class Server {
  //propiedades
  private readonly app = express();
  private readonly PORT: number;

  //constructor recibe el parametro de la interfaz Options
  constructor(options: Options) {
    //la propiedad PORT = recibe el parametro del constructor port
    this.PORT = options.port;
  }

  //metodo asincrono encargado de inicializar la app
  //metodo asincrono porque se va a tener controlar desde afuera de server.ts
  async start() {
    //middleware que le ensena a express a leer los .json ya que vamos a recibir informacion en json
    this.app.use(express.json());
    //middleware que le ensena a express a leer urlencoded
    this.app.use(express.urlencoded({ extended: true }));

    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
        message: "GET Method from server.ts",
      });
    });
    //metodo HTTP para escuchart y ver que si efectivamente este funcionando el server
    this.app.listen(this.PORT, () => {
      console.log(`Second server is running on port ${this.PORT} 😎`);
    });
  }
}
