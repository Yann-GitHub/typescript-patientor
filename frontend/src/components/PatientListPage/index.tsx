import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  Button,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
  Container,
  Paper,
  Chip,
  Avatar,
  Stack,
  InputAdornment,
  TextField,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  TableContainer,
  Fade,
  Alert,
  Grid,
} from "@mui/material";
import {
  PersonAdd,
  Search,
  Male,
  Female,
  Person,
  Work,
  Visibility,
  FilterList,
} from "@mui/icons-material";
import { PatientFormValues, Patient } from "../../types";
import AddPatientModal from "../AddPatientModal";
import HealthRatingBar from "../HealthRatingBar";
import patientService from "../../services/patients";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();

  // Function to handle patient click and navigate to details page
  const handlePatientClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  // Function to submit new patient data
  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);
      setPatients(patients.concat(patient));
      setModalOpen(false);
      setSuccessMessage(`Patient ${patient.name} added successfully!`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function for gender icon
  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return <Male color="primary" />;
      case "female":
        return <Female color="secondary" />;
      default:
        return <Person color="action" />;
    }
  };

  // Function for gender color
  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "primary";
      case "female":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Patient Management
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Manage and view all registered patients
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Click on a patient's name to view detailed information
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textAlign: "center",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {patients.length}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Total Patients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              textAlign: "center",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {
                  patients.filter((p) => p.gender.toLowerCase() === "male")
                    .length
                }
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Male Patients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              textAlign: "center",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {
                  patients.filter((p) => p.gender.toLowerCase() === "female")
                    .length
                }
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Female Patients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              color: "white",
              textAlign: "center",
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h4" fontWeight="bold">
                {new Set(patients.map((p) => p.occupation)).size}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Occupations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {successMessage && (
        <Fade in={!!successMessage}>
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        </Fade>
      )}

      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            placeholder="Search patients by name or occupation..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" spacing={2}>
            <Tooltip title="Filter patients">
              <IconButton color="primary">
                <FilterList />
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={openModal}
              sx={{
                background: "linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)",
                boxShadow: "0 3px 5px 2px rgba(25, 118, 210, .3)",
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                },
              }}
            >
              Add New Patient
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ borderRadius: 2, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Patient Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Gender
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Occupation
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Health Rating
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient: Patient) => (
                <TableRow
                  key={patient.id}
                  sx={{
                    "&:hover": {
                      bgcolor: "action.hover",
                      transform: "scale(1.002)",
                      transition: "all 0.2s ease",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => handlePatientClick(patient.id)}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          color: "primary.main",
                          mr: 2,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="medium">
                          {patient.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {patient.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getGenderIcon(patient.gender)}
                      label={patient.gender}
                      color={getGenderColor(patient.gender)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Work color="action" sx={{ mr: 1, fontSize: 18 }} />
                      <Typography variant="body2">
                        {patient.occupation}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <HealthRatingBar showText={false} rating={2} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePatientClick(patient.id);
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {filteredPatients.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "text.secondary",
            }}
          >
            <Person sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />
            <Typography variant="h6" gutterBottom>
              {searchTerm ? "No patients found" : "No patients yet"}
            </Typography>
            <Typography variant="body2">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Add your first patient to get started"}
            </Typography>
          </Box>
        )}
      </Paper>

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
    </Container>
  );
};

export default PatientListPage;
