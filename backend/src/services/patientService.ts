import { NewPatient, NonSensitivePatient, Patient } from "../types/types";
import patientData from "../data/patients";
import { v1 as uuid } from "uuid";

// Returns all patients without sensitive information (like ssn)
const getAllPatients = (): Array<NonSensitivePatient> => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

// Returns all patients with sensitive information (like ssn) included
// const getAllPatients = (): Array<Patient> => {
//   return patientData;
// };

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    // id: Math.max(...patientData.map((p) => p.id)) + 1, // Generate a new ID
    id: uuid(), // Generate a new ID using uuid
    ...entry,
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getAllPatients,
  getPatientById,
  addPatient,
};
