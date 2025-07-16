import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Gender, EntryFormValues } from "../../types";
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Container,
  Paper,
  Card,
  Avatar,
  Chip,
  Stack,
  Divider,
  Alert,
  Grid,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  Female,
  Male,
  Person,
  ArrowBack,
  Add,
  Work,
  CalendarToday,
  Badge,
  Timeline,
  HealthAndSafety,
} from "@mui/icons-material";
import { usePatientData } from "../../hooks/usePatientData";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import patientService from "../../services/patients";

const PatientDetailsPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [errorEntry, setErrorEntry] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();
  const { patient, loading, error, getDiagnosisName, setPatient } =
    usePatientData(id);

  // check if id is valid
  if (!id) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          <Typography variant="h6">Invalid patient ID</Typography>
          <Typography variant="body2">
            The patient ID provided is not valid. Please check the URL and try
            again.
          </Typography>
        </Alert>
      </Container>
    );
  }

  const renderGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Male color="primary" />;
      case Gender.Female:
        return <Female color="secondary" />;
      default:
        return <Person color="action" />;
    }
  };

  const getGenderColor = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return "primary";
      case Gender.Female:
        return "secondary";
      default:
        return "default";
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setErrorEntry(undefined);
  };

  interface ValidationError {
    code: string;
    message: string;
    path: (string | number)[];
  }

  interface ErrorResponse {
    error?: string;
    details?: ValidationError[];
  }

  const submitNewEntry = async (values: EntryFormValues, id: string) => {
    try {
      console.log("Submitting new entry with values:", values);
      const updatedPatient = await patientService.addEntry(id, values);
      console.log("Updated patient after adding entry:", updatedPatient);
      setPatient(updatedPatient);
      setModalOpen(false);
      setErrorEntry(undefined);
      setSuccessMessage("Medical entry added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const responseData = e.response?.data as ErrorResponse;

        if (responseData?.details && Array.isArray(responseData.details)) {
          const errorMessages = responseData.details.map((error) => {
            const fieldName = error.path.join(".") || "Unknown field";
            return `• ${fieldName}: ${error.message}`;
          });

          setErrorEntry(`Validation errors:\n${errorMessages.join("\n")}`);
        } else if (responseData?.error) {
          setErrorEntry(responseData.error);
        } else {
          setErrorEntry("An unexpected error occurred");
        }
      } else {
        console.error("Unknown error", e);
        setErrorEntry("Unknown error");
      }
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="text.secondary">
            Loading patient information...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          <Typography variant="h6">Error Loading Patient</Typography>
          <Typography variant="body2">{error}</Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => navigate("/patients")}
            sx={{ mt: 2 }}
          >
            Back to Patients
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!patient) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          <Typography variant="h6">Patient Not Found</Typography>
          <Typography variant="body2">
            The requested patient could not be found in the system.
          </Typography>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => navigate("/patients")}
            sx={{ mt: 2 }}
          >
            Back to Patients
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <IconButton
            onClick={() => navigate("/patients")}
            color="primary"
            sx={{
              bgcolor: "primary.light",
              "&:hover": { bgcolor: "primary.main", color: "white" },
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Patient Details
          </Typography>
        </Stack>
      </Box>

      {successMessage && (
        <Fade in={!!successMessage}>
          <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
            {successMessage}
          </Alert>
        </Fade>
      )}

      <Paper sx={{ p: 4, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: "auto",
                  mb: 2,
                  bgcolor: "rgba(255,255,255,0.2)",
                  fontSize: "2.5rem",
                }}
              >
                {patient.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </Avatar>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {patient.name}
              </Typography>
              <Chip
                icon={renderGenderIcon(patient.gender)}
                label={patient.gender}
                color={getGenderColor(patient.gender)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  "& .MuiChip-icon": { color: "white" },
                }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Personal Information
              </Typography>

              <Stack spacing={3} sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "info.light", color: "info.main" }}>
                    <Badge />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Social Security Number
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {patient.ssn}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{ bgcolor: "success.light", color: "success.main" }}
                  >
                    <Work />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Occupation
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {patient.occupation}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{ bgcolor: "warning.light", color: "warning.main" }}
                  >
                    <CalendarToday />
                  </Avatar>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Date of Birth
                    </Typography>
                    <Typography variant="h6" fontWeight="medium">
                      {patient.dateOfBirth}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "primary.light", color: "primary.main" }}>
                <Timeline />
              </Avatar>
              <Typography variant="h5" component="h2">
                Medical Entries
              </Typography>
              <Chip
                label={patient.entries ? patient.entries.length : 0}
                color="primary"
                size="small"
              />
            </Box>

            <Tooltip title="Add new medical entry">
              <Button
                onClick={openModal}
                variant="contained"
                startIcon={<Add />}
                sx={{
                  background:
                    "linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)",
                  boxShadow: "0 3px 5px 2px rgba(25, 118, 210, .3)",
                  borderRadius: 2,
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                  },
                }}
              >
                New Entry
              </Button>
            </Tooltip>
          </Stack>

          <Divider sx={{ my: 2 }} />
        </Box>

        {patient.entries && patient.entries.length > 0 ? (
          <Stack spacing={3}>
            {patient.entries.map((entry, index) => (
              <Fade in key={entry.id} timeout={300 + index * 100}>
                <Box>
                  <EntryDetails
                    entry={entry}
                    getDiagnosisName={getDiagnosisName}
                  />
                </Box>
              </Fade>
            ))}
          </Stack>
        ) : (
          <Card
            sx={{
              p: 6,
              textAlign: "center",
              bgcolor: "grey.50",
              borderRadius: 2,
            }}
          >
            <HealthAndSafety sx={{ fontSize: 80, color: "grey.300", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Medical Entries
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This patient doesn't have any medical entries yet.
            </Typography>
            <Button variant="outlined" startIcon={<Add />} onClick={openModal}>
              Add First Entry
            </Button>
          </Card>
        )}
      </Paper>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={errorEntry}
        patientId={id}
      />
    </Container>
  );
};

export default PatientDetailsPage;
