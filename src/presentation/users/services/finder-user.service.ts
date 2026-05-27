import { User } from "../../../data/postgres/models/user.model.js";
import { CustomError } from "../../../domain/index.js";

export class FinderUserService {
  async execute(userId: string) {
    const user = await User.findOne({
      select: ["id", "fullname", "email", "phone_number", "role"],
      where: {
        id: userId,
        status: true,
      },
    });

    //if we don't find the user throw this error
    if (!user) {
      throw CustomError.notFound(`User with id ${userId} not foud`);
    }
    //if found return/show it
    return user;
  }
}
