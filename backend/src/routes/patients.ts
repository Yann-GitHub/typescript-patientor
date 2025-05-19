import { Router } from "express";
import patientService from "../services/patientService";

const router = Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllPatients());
});

export default router;
