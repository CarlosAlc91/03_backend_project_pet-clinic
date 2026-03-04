//aqui es donde se va a configurar realmente la aplicacion
//se va a configurar el servidor de express

//interfaz que recibe el puerto
//una interfaz es el tipado de un objeto
interface Options {
  port: number;
}

//siempre se tiene que primero importar la libreria express
import express from "express";

export class Server {
  //propiedades
  private readonly app = express();
  private readonly PORT: number;

  //constructor recibe el parametro de la interfaz Options
  constructor(options: Options) {
    //la propiedad PORT = recibe el parametro del constructor port
    this.PORT = options.port;
  }
}
