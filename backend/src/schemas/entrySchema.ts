import { z } from "zod";
import { HealthCheckRating } from "../types/types";

// Schema for base entry properties without ID
const baseEntrySchema = z.object({
  description: z.string().min(1, "Description is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  specialist: z.string().min(1, "Specialist is required"),
  diagnosisCodes: z.array(z.string()).optional(),
});

// Schema for HealthCheck entry
const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

// Schema pour Hospital entry
const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Discharge date must be in YYYY-MM-DD format"
      ),
    criteria: z.string().min(1, "Discharge criteria is required"),
  }),
});

// Schema for OccupationalHealthcare entry
const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string().min(1, "Employer name is required"),
  sickLeave: z
    .object({
      startDate: z
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          "Start date must be in YYYY-MM-DD format"
        ),
      endDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format"),
    })
    .optional(),
});

// Schema for entry without ID with discriminated union
export const entryWithoutIdSchema = z.discriminatedUnion("type", [
  healthCheckEntrySchema,
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
]);

//  TypeScript type for entry without ID inferred from Zod schema
export type ZodEntryWithoutId = z.infer<typeof entryWithoutIdSchema>;
