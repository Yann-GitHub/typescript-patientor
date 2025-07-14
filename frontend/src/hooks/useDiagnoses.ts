// hooks/useDiagnoses.ts
import { useState, useEffect } from "react";
import { Diagnosis } from "../types";
import diagnosesService from "../services/diagnoses";

interface UseDiagnosesReturn {
  diagnoses: Diagnosis[];
  loading: boolean;
  error: string | null;
  getDiagnosisName: (code: string) => string;
}

export const useDiagnoses = (): UseDiagnosesReturn => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        setLoading(true);
        setError(null);

        const diagnosesData = await diagnosesService.getAll();
        setDiagnoses(diagnosesData);
      } catch (error) {
        console.error("Error fetching diagnoses:", error);
        setError("Failed to fetch diagnoses.");
        setDiagnoses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDiagnoses();
  }, []);

  return {
    diagnoses,
    loading,
    error,
    getDiagnosisName,
  };
};
