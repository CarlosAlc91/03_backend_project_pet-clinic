//DTO to update an user

import e from "express";
import { regularExp } from "../../../config/regex.js";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
  DOCTOR = "doctor",
}

export class UpdateUserDto {
  //we let the user to update this data.
  constructor(
    public fullname: string,
    public password: string,
    public email: string,
    public phone_number: string,
    //public role: UserRole
  ) {}

  //execute method
  static execute(object: {
    [key: string]: any;
  }): [string | undefined, UpdateUserDto?] {
    const { fullname, password, email, phone_number } = object;

    //validations
    if (!fullname) return ["Fullname is required"];
    if (!password) return ["Password is required"];
    if (!regularExp.password.test(password))
      return ["Format password is invalid"];
    if (!email) return ["Email is required"];
    if (!regularExp.email.test(email)) return ["Email is invalid"];
    if (!phone_number) return ["Phone number is required"];

    return [
      undefined,
      new UpdateUserDto(
        fullname.trim().toLowerCase(),
        password.trim(),
        email.trim().toLowerCase(),
        phone_number.trim(),
      ),
    ];
  }
}
