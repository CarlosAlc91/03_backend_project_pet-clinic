import { User } from "../../../data/postgres/models/user.model.js";

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
      throw new Error(`User with id: ${userId} not found`);
    }
    //if found return/show it
    return user;
  }
}

