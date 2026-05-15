import { User } from "../../../data/postgres/models/uner.model.js";

//clase para registrar a un usuario
export class RegisterUserService {
  //metodo asincrono para devolver un mensaje cuando se haya regustrado un usuario exitosamente
  async execute(userData: any) {
    const user = new User();

    user.fullname = userData.fullname;
    user.email = userData.email;
    user.password = userData.password;
    user.phone_number = userData.phone_number;
    user.role = userData.role;

    try {
      //const userCreated =
      await user.save();
      //return userCreated;
      return {
        message: "User created successfully",
      };
    } catch (error) {
      throw new Error("An error occurred while registering the user");
    }

    return {
      message: "User registered successfully",
      userData,
    };
  }
}

//9 - 35:00
