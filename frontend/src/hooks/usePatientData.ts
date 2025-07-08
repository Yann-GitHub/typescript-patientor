// hooks/usePatientData.ts
import { useState, useEffect } from "react";
import { Patient, Diagnosis } from "../types";
import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";

interface UsePatientDataReturn {
  patient: Patient | null;
  diagnoses: Diagnosis[];
  loading: boolean;
  error: string | null;
  getDiagnosisName: (code: string) => string;
}

export const usePatientData = (
  patientId: string | undefined
): UsePatientDataReturn => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Utility function to get the diagnosis name by code
  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!patientId) {
        setError("No patient ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null); // Reset error state

        // Fetch patient and diagnoses data concurrently
        const [patientData, diagnosesData] = await Promise.all([
          patientService.getById(patientId),
          diagnosesService.getAll(),
        ]);

        setPatient(patientData);
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch patient data.");
        setPatient(null);
        setDiagnoses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId]);

  return {
    patient,
    diagnoses,
    loading,
    error,
    getDiagnosisName,
  };
};
