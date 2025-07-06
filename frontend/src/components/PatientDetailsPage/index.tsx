import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Gender } from "../../types";
import patientService from "../../services/patients";
import { Typography, Box, CircularProgress } from "@mui/material";
import { Female, Male } from "@mui/icons-material";

const PatientDetailsPage = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const renderGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      default:
        return <span>Other</span>;
    }
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      if (!id) {
        setError("No patient ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const patientData = await patientService.getById(id as string);
        setPatient(patientData);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setError("Failed to fetch patient details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;
  if (!patient) return <Typography>Patient not found</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1">
        {patient.name}
        <Box component="span" ml={1}>
          {renderGenderIcon(patient.gender)}
        </Box>
      </Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
    </Box>
  );
};
export default PatientDetailsPage;
