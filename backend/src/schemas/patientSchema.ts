import { z } from "zod";
import { Gender } from "../types/types";

export const newPatientSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  dateOfBirth: z.string().date(),
  ssn: z.string().min(6, "SSN must be at least 6 characters long"),
  occupation: z
    .string()
    .min(3, "Occupation must be at least 3 characters long"),
  gender: z.nativeEnum(Gender),
});
