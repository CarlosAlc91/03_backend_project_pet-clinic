import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError } from "../../../domain/index.js";
/**
 * Service responsible for soft-deleting users from the system.
 * Instead of permanently removing records, it deactivates users by setting their status to false.
 */
export class DeleteUserService {
  /**
   * Executes a soft delete operation on a user by deactivating their account.
   *
   * @param userId - The unique identifier of the user to delete/deactivate
   * @throws Error if the user doesn't exist or is already inactive
   * @throws Error if the save operation fails
   */
  async execute(userId: string) {
    // Step 1: Verify the user exists and is currently active before attempting deletion
    const user = await this.ensureUserExists(userId);

    // Step 2: Perform soft delete by setting status to false
    // This preserves the user record while marking it as inactive/deleted
    user.status = false;

    try {
      // Persist the status change to the database
      await user.save();
      return {
        message: "User deleted successfully.",
      };
    } catch (error) {
      // Wrap database errors with a user-friendly message
      throw CustomError.internalSever("Error trying to delete user");
    }
  }

  /**
   * Private helper method to validate user existence before deletion.
   * Ensures the user ID is valid and the account is currently active.
   *
   * @param userId - The unique identifier to search for
   * @returns The found user entity if it exists and is active
   * @throws Error if no active user is found with the given ID
   */
  private async ensureUserExists(userId: string): Promise<User> {
    // Query the database for an active user matching the provided ID
    // Using select: ["id"] for performance since we only need to verify existence
    const user = await User.findOne({
      select: ["id"],
      where: {
        id: userId,
        status: true, // Only look for currently active users
      },
    });

    // If no active user is found, throw an error to prevent duplicate deletion attempts
    if (!user) {
      throw CustomError.notFound(`User with id ${userId} not found`);
    }
    return user;
  }
}
