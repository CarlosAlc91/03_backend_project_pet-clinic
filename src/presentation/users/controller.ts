/**
 * UserController
 *
 * Main controller for handling all user-related operations.
 * Acts as an intermediary between HTTP routes and business logic (services).
 * Uses dependency injection to decouple service logic.
 */

import type { Request, Response } from "express";
import { FinderUsersService } from "./services/finder-users.service.js";
import { RegisterUserService } from "./services/register-user.service.js";
import type { FinderUserService } from "./services/finder-user.service.js";
import type { UpdateUserService } from "./services/update-user.service.js";
import type { DeleteUserService } from "./services/delete-user.service.js";
import { RegisterUserDto, UpdateUserDto } from "../../domain/index.js";

export class UserController {
  constructor(
    // Dependency injection for each required service
    // Each service encapsulates a specific business logic operation    private readonly finderUsers: FinderUsersService,

    // Service to fetch all users
    // Service to register new users

    private readonly finderUsers: FinderUsersService,
    private readonly registerUser: RegisterUserService,
    // Service to find a user by ID
    private readonly finderUser: FinderUserService,
    // Service to update user data
    private readonly updateUser: UpdateUserService,
    // Service to delete/deactivate users
    private readonly deleteUser: DeleteUserService,
  ) {}

  /**
   * Retrieves the complete list of all active users.
   *
   * @route GET /users
   * @param req - Express Request object
   * @param res - Express Response object
   * @returns JSON with array of users (status 200) or error message (status 500)
   */
  findAll = (req: Request, res: Response) => {
    this.finderUsers
      .execute() // Execute the search for all users
      .then((users) => res.status(200).json(users)) // Return the found users
      .catch((err) => res.status(500).json({ mesage: err.message })); // Handle server errors
  };

  /**
   * Registers a new user in the system.
   *
   * @route POST /users
   * @param req - Request with user data in req.body
   * @param res - Express Response object
   * @returns JSON with confirmation message (status 201) or error (status 500)
   */
  register = (req: Request, res: Response) => {
    //desestructurar regisruserdto
    const [error, registerUserDtos] = RegisterUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    this.registerUser
      //aqui se pasa el metodo que esta junto al [error, registerUserDto]
      .execute(registerUserDtos!) // Pass the body data to the registration service

      .then((message) => res.status(201).json(message)) // Status 201: resource successfully created
      .catch((err) => res.status(500).json({ message: err.message })); // Server error
  };

  /**
   * Finds a specific user by their ID.
   *
   * @route GET /users/:id
   * @param req - Request with user ID in req.params
   * @param res - Express Response object
   * @returns JSON with user data (status 200), validation error (status 400), or server error (status 500)
   */
  findOne = (req: Request, res: Response) => {
    const { id } = req.params; // Extract the ID from URL parameters
    // Early validation: verify that the ID exists and is the correct type
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "User ID is required" });
    }

    this.finderUser
      .execute(id) // Find the user by their ID
      .then((user) => res.status(200).json(user)) // Return the found user
      .catch((err) => res.status(500).json({ message: err.message })); // Server error
  };

  /**
   * Updates an existing user's data.
   *
   * @route PATCH /users/:id
   * @param req - Request with ID in req.params and update data in req.body
   * @param res - Express Response object
   * @returns JSON with confirmation message (status 200) or error (status 500)
   */
  update = (req: Request, res: Response) => {
    const { id } = req.params; // Extract the ID of the user to update

    const [error, updateUserDto] = UpdateUserDto.execute(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }
    this.updateUser
      .execute(id as string, updateUserDto!) // Send the ID and new data to the service

      .then((user) => res.status(200).json(user)) // Return successful update confirmation
      .catch((err) => res.status(500).json({ message: err.message })); // Server error
  };

  /**
   * Deletes or deactivates a user from the system.
   *
   * @route DELETE /users/:id
   * @param req - Express Request object (should include the user ID)
   * @param res - Express Response object
   * @returns JSON with confirmation message (status 200) or error (status 500)
   *
   * TODO: Implement ID extraction from req.params to identify which user to delete
   */
  delete = (req: Request, res: Response) => {
    const { id } = req.params;
    this.deleteUser
      .execute(id as string)
      //status 204 means "no content"
      .then(() => res.status(204).json(null))
      .catch((err) => res.status(500).json({ message: err.message }));
  };
}
