import { NonSensitivePatient } from "../types/types";
import patientData from "../data/patients";

// const getAllPatients = (): Array<Patient> => {
//   return patientData;
// };

const getAllPatients = (): Array<NonSensitivePatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getAllPatients,
};
