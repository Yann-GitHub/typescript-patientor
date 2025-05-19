import { Diagnosis } from "../types/types";
import diagnosisData from "../data/diagnoses";

const getAllDiagnoses = (): Array<Diagnosis> => {
  return diagnosisData;
};

export default {
  getAllDiagnoses,
};
