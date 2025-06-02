import { Request, Response, NextFunction } from "express";
import { newPatientSchema } from "../schemas/patientSchema";

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    console.log(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default newPatientParser;
