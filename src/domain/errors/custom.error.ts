//class to handle errors
export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }

  //bad request
  static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  //unathorizaed
  static unAuthorized(message: string) {
    return new CustomError(message, 401);
  }

  //invalid access
  static forbidden(message: string) {
    return new CustomError(message, 403);
  }

  //notfound
  static notFound(message: string) {
    return new CustomError(message, 404);
  }

  //internal server error
  static internalSever(message: string) {
    return new CustomError(message, 501);
  }
}
