import { encriptAdapter } from "../../../config/bcrypt.adapter.js";
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
    //4. return token
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

  private generateToken() {}
}
