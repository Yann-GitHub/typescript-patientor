import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Gender, EntryFormValues } from "../../types";
import { Typography, Box, CircularProgress, Button } from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import { usePatientData } from "../../hooks/usePatientData";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import patientService from "../../services/patients";

const PatientDetailsPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorEntry, setErrorEntry] = useState<string>();

  const { id } = useParams();
  const { patient, loading, error, getDiagnosisName, setPatient } =
    usePatientData(id);

  // Vérification early return
  if (!id) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error" variant="h6">
          Invalid patient ID
        </Typography>
      </Box>
    );
  }

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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setErrorEntry(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues, id: string) => {
    try {
      console.log("Submitting new entry with values:", values);
      const updatedPatient = await patientService.addEntry(id, values);
      console.log("Updated patient after adding entry:", updatedPatient);
      setPatient(updatedPatient);
      setModalOpen(false);
      setErrorEntry(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setErrorEntry(message);
        } else {
          setErrorEntry("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setErrorEntry("Unknown error");
      }
    }
  };

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

  return (
    <Box sx={{ padding: 3 }}>
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

      <Box>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
          Medical Entries
        </Typography>

        <Button
          onClick={() => openModal()}
          variant="contained"
          color="secondary"
          sx={{ marginBottom: 2 }}
        >
          New Entry
        </Button>

        <AddEntryModal
          modalOpen={modalOpen}
          onClose={closeModal}
          onSubmit={submitNewEntry}
          error={errorEntry}
          patientId={id}
        />

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
