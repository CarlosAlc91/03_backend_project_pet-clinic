import { encriptAdapter } from "../../../config/bcrypt.adapter.js";
import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError, type RegisterUserDto } from "../../../domain/index.js";

/**
 * Service responsible for handling the business logic of user registration.
 * Manages data mapping, database persistence, and database-specific exception handling.
 */
export class RegisterUserService {
  /**
   * Executes the user registration process.
   * Maps the incoming DTO data to the database entity and attempts to persist it.
   * * @param userData - The Data Transfer Object containing the new user's credentials and details.
   * @returns A promise that resolves to a success message object upon successful registration.
   * @throws {CustomError} Throws a mapped HTTP exception if validation or persistence fails.
   */
  async execute(userData: RegisterUserDto) {
    const user = new User();

    user.fullname = userData.fullname;
    user.email = userData.email;
    user.password = this.encriptedPassword(userData.password);
    user.phone_number = userData.phone_number;
    //user.role = userData.role;

    try {
      //const userCreated =
      await user.save();
      //return userCreated;
      return {
        message: "User created successfully",
      };
    } catch (error: any) {
      this.throwException(error);
    }
  }

  /**
   * Intercepts database runtime errors and maps PostgreSQL error codes to standard HTTP exceptions.
   * * @param error - The raw error object caught from the database transaction.
   * @throws {CustomError} Mapped exception matching the database failure (409 Conflict, 422 Unprocessable Entity, or 500 Internal Server).
   * @private
   */
  private throwException(error: any) {
    // PostgreSQL Code '23505': Unique violation error (e.g., duplicate email)
    if (error.code === "23505") {
      throw CustomError.conflict("Email already in use");
    }
    // PostgreSQL Code '22P02': Invalid text representation / Data type mismatch
    if (error.code === "22P02") {
      throw CustomError.unprocessableEntity("Invalid data type");
    }

    // Fallback for unhandled database exceptions or general internal server runtime failures
    throw CustomError.internalSever("Error trying to create user");
  }

  //method to encript passwords
  private encriptedPassword(password: string): string {
    return encriptAdapter.hash(password);
  }
}
