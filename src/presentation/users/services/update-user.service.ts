import { User } from "../../../data/postgres/models/user.model.js";

export class UpdateUserService {
  async execute(userId: string, userData: any) {
    /*
    try {
      return await User.update({
        select: ["id", "fullname", "email", "phone_number", "role"],
        where: {
          id: userId,
          status: true,
        },
      });
    } catch (error) {
      console.error(error);
    }
    */

    return {
      message: "User updated",
    };
  }
}
