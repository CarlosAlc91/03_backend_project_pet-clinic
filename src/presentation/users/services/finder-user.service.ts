import { User } from "../../../data/postgres/models/user.model.js";

export class FinderUserService {
  async execute(userId: string) {
    try {
      return await User.findOne({
        select: ["id", "fullname", "email", "phone_number", "role"],
        where: {
          id: userId,
          status: true,
        },
      });
    } catch (error) {
      console.error("Error en FinderUserService")
      throw new Error("An erro occurred while searching for the user");
    }
  }
}

//9 - 1:00
