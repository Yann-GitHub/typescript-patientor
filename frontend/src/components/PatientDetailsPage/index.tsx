// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Gender } from "../../types";
// import patientService from "../../services/patients";
// import diagnosesService from "../../services/diagnoses";
import { Typography, Box, CircularProgress } from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import { usePatientData } from "../../hooks/usePatientData";
import EntryDetails from "./EntryDetails";

const PatientDetailsPage = () => {
  // const [patient, setPatient] = useState<Patient | null>(null);
  // const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const { patient, loading, error, getDiagnosisName } = usePatientData(id);
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

  // useEffect(() => {
  //   const fetchPatientDetails = async () => {
  //     if (!id) {
  //       setError("No patient ID provided");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       setLoading(true);
  //       const patientData = await patientService.getById(id as string);
  //       setPatient(patientData);
  //     } catch (error) {
  //       console.error("Error fetching patient details:", error);
  //       setError("Failed to fetch patient details.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPatientDetails();
  // }, [id]);

  // if (loading) return <CircularProgress />;
  // if (error) return <Typography color="error">Error: {error}</Typography>;
  // if (!patient) return <Typography>Patient not found</Typography>;

  // États de chargement et d'erreur
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!patient) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Patient not found</Typography>
      </Box>
    );
  }

  // return (
  //   <Box sx={{ padding: 2 }}>
  //     <Typography variant="h4" component="h1">
  //       {patient.name}
  //       <Box component="span" ml={1}>
  //         {renderGenderIcon(patient.gender)}
  //       </Box>
  //     </Typography>
  //     <Typography>SSN: {patient.ssn}</Typography>
  //     <Typography>Occupation: {patient.occupation}</Typography>
  //     {/* <Typography>Date of Birth: {patient.dateOfBirth}</Typography> */}
  //     <Typography style={{ marginTop: "20px" }} variant="h5" component="h1">
  //       entries
  //     </Typography>
  //     {patient.entries && patient.entries.length > 0 ? (
  //       patient.entries.map((entry) => (
  //         <Box key={entry.id} sx={{ marginBottom: 2 }}>
  //           <Typography style={{ marginBottom: "30px" }} variant="body1">
  //             {entry.date} - {entry.description}
  //           </Typography>
  //           {/* <Typography variant="body2">
  //             Specialist: {entry.specialist}
  //           </Typography> */}
  //           {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
  //             // <Typography variant="">
  //             //   Diagnosis Codes: {entry.diagnosisCodes.join(", ")}
  //             // </Typography>
  //             <ul>
  //               {entry.diagnosisCodes.map((code) => (
  //                 <li key={code}>{code}</li>
  //               ))}
  //             </ul>
  //           )}
  //         </Box>
  //       ))
  //     ) : (
  //       <Typography>No entries found for this patient.</Typography>
  //     )}
  //   </Box>
  // );
  return (
    <Box sx={{ padding: 3 }}>
      {/* En-tête du patient */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
          {patient.name}
          <Box component="span" ml={1}>
            {renderGenderIcon(patient.gender)}
          </Box>
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body1">
            <strong>SSN:</strong> {patient.ssn}
          </Typography>
          <Typography variant="body1">
            <strong>Occupation:</strong> {patient.occupation}
          </Typography>
          <Typography variant="body1">
            <strong>Date of Birth:</strong> {patient.dateOfBirth}
          </Typography>
        </Box>
      </Box>

      {/* Section des entrées */}
      <Box>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
          Medical Entries
        </Typography>

        {patient.entries && patient.entries.length > 0 ? (
          patient.entries.map((entry) => (
            <EntryDetails
              key={entry.id}
              entry={entry}
              getDiagnosisName={getDiagnosisName}
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No medical entries found for this patient.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
export default PatientDetailsPage;
