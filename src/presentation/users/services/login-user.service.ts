import { encriptAdapter } from "../../../config/bcrypt.adapter.js";
import { envs } from "../../../config/envs.js";
import { JwtAdapter } from "../../../config/jwt.adapter.js";
import { User } from "../../../data/postgres/models/user.model.js";
import type { LoginUserDto } from "../../../domain/dtos/users/login-user.dto.js";
import { CustomError } from "../../../domain/index.js";

export class LoginUserService {
  async execute(credentials: LoginUserDto) {
    //1. check if user exists
    const user = await this.ensureUserExists(credentials.email);
    //2. check if password is correct
    this.ensurePasswordIsCorrect(credentials.password, user!.password);
    //3. generate a token
    const token = await this.generateToken({ id: user!.id }, envs.JWT_EXPIRE_IN);
    //4. return token
    return {
      token,
      user: {
        id: user?.id,
        email: user?.email,
        phone: user?.phone_number,
        role: user?.role
      }
    }
  }

  private ensureUserExists(email: string) {
    const user = User.findOne({
      where: {
        email: email,
        status: true,
      },
    });

    if (!user) {
      throw CustomError.notFound("User not found");
    }

    return user;
  }

  private ensurePasswordIsCorrect(
    unHashedPassword: string,
    hashedPassword: string,
  ) {
    const isMatch = encriptAdapter.compare(unHashedPassword, hashedPassword);

    if (!isMatch) {
      throw CustomError.unAuthorized("Invalid credentials");
    }
  }

  private async generateToken(payload: any, duration: string) {
    const token = await JwtAdapter.generateToken(payload, duration);

    if (!token) throw CustomError.internalSever("Error while creating JWT");

    return token;
  }
}
