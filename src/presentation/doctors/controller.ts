import type { Request, Response } from "express";
import type { CreatorDoctorService } from "./services/creator-doctor.service.js";
import type { FinderDoctorService } from "./services/finder-doctors.service.js";
import { CustomError } from "../../domain/index.js";
import { error } from "node:console";

export class DoctorController {
  constructor(
    private creatorDoctorService: CreatorDoctorService,
    private finderDoctorService: FinderDoctorService,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went wrong🧨" });
  };

  create = (req: Request, res: Response) => {
    this.creatorDoctorService
      .execute()
      .then((msg) => res.status(201).json(msg))
      .catch((error) => this.handleError(error, res));
  };
}
