import jwt from "jsonwebtoken";
import { envs } from "./envs.js";

export class JwtAdapter {
  //method to generate a token
  static async generateToken(payload: any, duration: string = "3h") {
    return new Promise((resolve) => {
      jwt.sign(payload, envs.JWT_KEY, { expiresIn: duration}, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }
}
