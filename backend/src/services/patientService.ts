import {
  NewPatient,
  NonSensitivePatient,
  Patient,
  EntryWithoutId,
  Entry,
} from "../types/types";
import patientData from "../data/patients";
import { v1 as uuid } from "uuid";

// Returns all patients without sensitive information (like ssn)
const getAllPatients = (): Array<NonSensitivePatient> => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

// Returns all patients with sensitive information (like ssn) included
// const getAllPatients = (): Array<Patient> => {
//   return patientData;
// };

const getPatientById = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatientEntry = {
    // id: Math.max(...patientData.map((p) => p.id)) + 1, // Generate a new ID
    id: uuid(), // Generate a new ID using uuid
    ...entry,
  };
  patientData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (
  patientId: string,
  entry: EntryWithoutId
): Patient => {
  const patient = getPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  if (!patient.entries) {
    patient.entries = [];
  }

  const newEntry: Entry = {
    ...entry,
    id: uuid(),
  };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getAllPatients,
  getPatientById,
  addPatient,
  addEntryToPatient,
};
