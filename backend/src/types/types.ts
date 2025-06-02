// import { newPatientSchema } from "../utils/utils";
import { newPatientSchema } from "../schemas/patientSchema";
import { z } from "zod";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

// type Gender = "male" | "female" | "other";
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// With Zod inference
export type NewPatient = z.infer<typeof newPatientSchema>;

// type extends
export type Patient = NewPatient & {
  id: string;
};

// interface extends
// export interface Patient extends NewPatient {
//   id: string;
// };

// Without Zod inference
// export type Patient = {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   occupation: string;
//   gender: Gender;
// };

// export type NewPatient = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn">;
