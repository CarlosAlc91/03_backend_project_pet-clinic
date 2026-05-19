import { User } from "../../../data/postgres/models/user.model.js";
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
  async execute(userId: string, userData: any) {
    // Verify if the user exists and is currently active in the system
    // Using select: ["id"] for performance optimization since we only need to verify existence

    const user = await this.ensureUserExists(userId);

    // Apply the updated values from userData to the corresponding user fields
    // Note: This will overwrite all specified fields even if they're undefined in userData
    user.fullname = userData.fullname;
    user.password = userData.password;
    user.email = userData.email;
    user.phone_number = userData.phone_number;
    user.role = userData.role;

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
      throw new Error("Error occurred while updating the user");
    }
  }

  //metdo privado para hacer la validacion de la existencia deun ususairo
  private async ensureUserExists(userId: string): Promise<User> {
    const user = await User.findOne({
      select: ["id"],
      where: {
        id: userId,
        status: true, // Only allow updating active
      },
    });

    // If no active user is found with the provided ID, abort the update
    if (!user) {
      throw new Error(`User with ID ${userId} not found `);
    }

    return user;
  }
}
