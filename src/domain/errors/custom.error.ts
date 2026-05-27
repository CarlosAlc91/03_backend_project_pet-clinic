/**
 * Custom error handling class that extends the native Error object.
 * Provides standard static factory methods to map specific HTTP status codes.
 */
export class CustomError extends Error {
  /**
   * Initializes a new instance of CustomError.
   * @param message - The descriptive error message.
   * @param statusCode - The corresponding HTTP status code.
   */
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    // Pass the message to the parent Error class constructor to properly initialize the base object
    super(message);
  }

  /**
   * Generates a 400 Bad Request error.
   * Used when the client sends malformed data or invalid payload validations.
   * @param message - Descriptive error message.
   * @returns An instance of CustomError with status code 400.
   */
  static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  /**
   * Generates a 401 Unauthorized error.
   * Used when authentication credentials are missing, invalid, or expired.
   * @param message - Descriptive error message.
   * @returns An instance of CustomError with status code 401.
   */
  static unAuthorized(message: string) {
    return new CustomError(message, 401);
  }

  /**
   * Generates a 403 Forbidden error.
   * Used when the authenticated client lacks the required permissions or roles.
   * @param message - Descriptive error message.
   * @returns An instance of CustomError with status code 403.
   */
  static forbidden(message: string) {
    return new CustomError(message, 403);
  }

  /**
   * Generates a 404 Not Found error.
   * Used when the requested resource or entity does not exist in the database.
   * @param message - Descriptive error message.
   * @returns An instance of CustomError with status code 404.
   */
  static notFound(message: string) {
    return new CustomError(message, 404);
  }

  //conflic errors
  static conflict(message: string) {
    return new CustomError(message, 409);
  }

  //unprocessable Entity
  static unprocessableEntity(message: string) {
    return new CustomError(message, 422);
  }

  /**
   * Generates a 500 Internal Server Error.
   * Used as a fallback for unexpected server-side exceptions or unhandled runtime failures.
   * @param message - Descriptive error message.
   * @returns An instance of CustomError with status code 500.
   */
  static internalSever(message: string) {
    return new CustomError(message, 501);
  }
}
