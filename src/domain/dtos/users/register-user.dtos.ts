import { regularExp } from "../../../config/regex.js";

//DTO to register an user
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  DOCTOR = "doctor",
}

export class RegisterUserDto {
  //constructor to receive data ia want/need to validate
  /**
   *
   * fullname
   * password
   * email
   * phone_number
   * role
   *
   */
  constructor(
    public fullname: string,
    public password: string,
    public email: string,
    public phone_number: string,
    //public role: UserRole,
  ) {}

  //metodo statico
  /**
   *
   * @param object
   *  execute(object: {[key: string]: value de tipo any}){}
   */
  static execute(object: {
    [key: string]: any;
  }): [string | undefined, RegisterUserDto?] {
    //desestructura la datra que se recibe por bodfy

    const { fullname, password, email, phone_number } = object;

    //validaciones
    if (!fullname) return ["Fullname is required"];
    if (!password) return ["Password is required"];
    if (!regularExp.password.test(password))
      return ["Format password is invalid"];
    if (!email) return ["Email is required"];
    if (!regularExp.email.test(email)) return ["Email is invalid"];
    if (!phone_number) return ["Phone number is required"];

    //si pasan las validaciones donde l primer elemento es undefined pero si todo esta bien no se retorna nad
    return [
      undefined,
      new RegisterUserDto(
        fullname.trim().toLowerCase(),
        password.trim(),
        email.trim().toLowerCase(),
        phone_number.trim(),
      ),
    ];
  }
}
