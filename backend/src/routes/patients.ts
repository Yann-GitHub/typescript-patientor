import { Router } from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils/utils";

const router = Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllPatients());
});

// router.post("/", (_req, res) => {
//   res.send(patientService.addPatient());
// });

router.post("/", (req, res) => {
  // res.send(patientService.addPatient());
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
