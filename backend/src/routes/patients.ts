import { Router, Request, Response } from "express";
import patientService from "../services/patientService";
import errorMiddleware from "../middlewares/errorHandlers";
import newPatientParser from "../middlewares/validators";
import { NewPatient, Patient } from "../types/types";

const router = Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient not found");
  }
});

// With Zod validation
router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.status(201).json(addedPatient);
  }
);

// Without Zod validation
// router.post("/", (req, res) => {
//   // res.send(patientService.addPatient());
//   try {
//     const newPatient = toNewPatient(req.body);

//     const addedPatient = patientService.addPatient(newPatient);
//     res.status(201).json(addedPatient);
//   } catch (error: unknown) {
//     let errorMessage = "Something went wrong.";
//     if (error instanceof Error) {
//       errorMessage += " Error: " + error.message;
//     }
//     res.status(400).send(errorMessage);
//   }
// });

router.use(errorMiddleware);

export default router;
