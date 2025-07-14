import { Request, Response, NextFunction } from "express";
import { newPatientSchema } from "../schemas/patientSchema";
import { entryWithoutIdSchema } from "../schemas/entrySchema";

export const newPatientParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = newPatientSchema.parse(req.body);
    req.body = validatedData;
    console.log("✅ Validated patient data:", req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const validatedEntry = entryWithoutIdSchema.parse(req.body);
    req.body = validatedEntry;
    console.log("✅ Validated entry data:", req.body);
    next();
  } catch (error: unknown) {
    console.error("❌ Entry validation error:", error);
    next(error);
  }
};
