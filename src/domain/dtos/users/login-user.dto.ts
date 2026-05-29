import { regularExp } from "../../../config/regex.js";

export class LoginUserDto {
  constructor(
    private readonly email: string,
    private readonly password: string,
  ) {}

  static execute(object: {
    [key: string]: any;
  }): [string | undefined, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["email is required"];
    if (!password) return ["Password is required"];
    if (!regularExp.password.test(password))
      return ["Format password is invalid"];
    if (!regularExp.email.test(email)) return ["Email is invalid"];

    return [
      undefined,
      new LoginUserDto(email.trim().toLowerCase(), password.trim()),
    ];
  }
}
