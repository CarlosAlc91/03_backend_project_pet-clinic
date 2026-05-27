import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError, type UpdateUserDto } from "../../../domain/index.js";
/**
 * Service responsible for updating existing user information.
 * Handles user data modification with validation and error handling.
 */
export class UpdateUserService {
  /**
   * Updates a user's information in the database.
   *
   * @param userId - The unique identifier of the user to update
   * @param userData - Object containing the fields to update (fullname, email, password, etc.)
   * @returns Object with success message when user is updated successfully
   * @throws Error if the user doesn't exist or is inactive
   * @throws Error if the save operation fails
   */
  async execute(userId: string, userData: UpdateUserDto) {
    // Verify if the user exists and is currently active in the system
    // Using select: ["id"] for performance optimization since we only need to verify existence

    const user = await this.ensureUserExists(userId);

    // Apply the updated values from userData to the corresponding user fields
    // Note: This will overwrite all specified fields even if they're undefined in userData
    user.fullname = userData.fullname;
    user.password = userData.password;
    user.email = userData.email;
    user.phone_number = userData.phone_number;
    //user.role = userData.role;

    // Attempt to persist the changes to the database
    // Wrapped in try-catch to handle potential database errors gracefullyhile updating
    try {
      // Save the updated user entity to the database
      await user.save();
      // Return a success response object confirming the update
      return {
        message: "User updated successfully.",
      };
    } catch (error) {
      // Provide a consistent error message while hiding internal database details
      this.throwException(error);
    }
  }

  /**
   * Validates if a user exists and is currently active.
   * @param userId - The unique identifier to look up.
   * @returns A promise that resolves to the fully loaded active User entity.
   * @throws {CustomError} 404 Not Found if the user does not exist or is inactive.
   * @private
   */
  private async ensureUserExists(userId: string): Promise<User> {
    const user = await User.findOne({
      select: ["id"],
      where: {
        id: userId,
        status: true, // Restrict updates to active accounts only
      },
    });

    // If no active user is found with the provided ID, abort the update
    if (!user) {
      throw CustomError.notFound(`User with id: ${userId} not found`);
    }

    return user;
  }

  /**
   * Intercepts database runtime errors during update operations and maps them to HTTP exceptions.
   * @param error - The raw error object caught from the database transaction.
   * @throws {CustomError} Mapped exception (409 Conflict, 422 Unprocessable Entity, or 500 Internal Server).
   * @private
   */ private throwException(error: any) {
    // PostgreSQL Code '23505': Unique violation (e.g., trying to update to an email already taken)
    if (error.code === "23505") {
      throw CustomError.conflict("Email already in use");
    }
    // PostgreSQL Code '22P02': Invalid text representation / Data type mismatch
    if (error.code === "22P02") {
      throw CustomError.unprocessableEntity("Invalid data type");
    }

    // Fallback for unhandled database exceptions or internal runtime failures
    throw CustomError.internalSever("Error trying to update user");
  }
}
