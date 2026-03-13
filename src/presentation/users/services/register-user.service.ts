//clase para registrar a un usuario
export class RegisterUserService {
  //metodo asincrono para devolver un mensaje cuando se haya regustrado un usuario exitosamente
  async execute() {
    return {
      message: "User registered successfully",
    };
  }
}
