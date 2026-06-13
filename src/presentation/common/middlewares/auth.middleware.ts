//middleware to validate authentication

import type { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../../config/jwt.adapter.js";
import { User, UserRole } from "../../../data/postgres/models/user.model.js";

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Token not provided" });

    try {
      const payload = (await JwtAdapter.validateToken(token)) as { id: string };

      if (!payload) return res.status(401).json({ message: "Invalid token" });

      const user = await User.findOne({
        where: {
          id: payload.id,
          status: true,
        },
      });

      if (!user) return res.status(401).json({ message: "Invalid user" });

      req.body = req.body || {};
      req.body.sessionUser = user;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error..." });
    }
  }

  //restrict access depending on roles
  static restrictTo = (...roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.body.sessionUser.role)) {
        return res
          .status(403)
          .json({ message: "You're not authorized to access this route" });
      }
      next();
    };
  };

}
