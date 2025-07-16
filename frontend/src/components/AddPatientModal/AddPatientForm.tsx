import { useState, SyntheticEvent } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Stack,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
  InputAdornment,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  Person,
  Badge,
  Work,
  CalendarToday,
  Wc,
  Save,
  Cancel,
  Male,
  Female,
  Help,
} from "@mui/icons-material";
import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
  isLoading?: boolean;
}

interface GenderOption {
  value: Gender;
  label: string;
  icon: React.ReactNode;
  color: string;
}

// Options for Gender selection
const genderOptions: GenderOption[] = [
  {
    value: Gender.Male,
    label: "Male",
    icon: <Male />,
    color: "#1976d2",
  },
  {
    value: Gender.Female,
    label: "Female",
    icon: <Female />,
    color: "#d32f2f",
  },
  {
    value: Gender.Other,
    label: "Other",
    icon: <Help />,
    color: "#ed6c02",
  },
];

const AddPatientForm = ({ onCancel, onSubmit, isLoading = false }: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(Gender.Other);

  // Function to validate the form inputs
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!ssn.trim()) {
      newErrors.ssn = "Social Security Number is required";
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(ssn)) {
      newErrors.ssn = "Invalid SSN format (use XXX-XX-XXXX)";
    }

    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else if (new Date(dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of birth cannot be in the future";
    }

    if (!occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle SSN input change and format it
  const handleSsnChange = (value: string) => {
    const numbers = value.replace(/\D/g, "");

    let formatted = numbers;
    if (numbers.length >= 4) {
      formatted = numbers.slice(0, 3) + "-" + numbers.slice(3);
    }
    if (numbers.length >= 6) {
      formatted =
        numbers.slice(0, 3) +
        "-" +
        numbers.slice(3, 5) +
        "-" +
        numbers.slice(5, 9);
    }

    setSsn(formatted);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Object.values(Gender).includes(value as Gender)) {
      setGender(value as Gender);
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      name: name.trim(),
      occupation: occupation.trim(),
      ssn: ssn.trim(),
      dateOfBirth,
      gender,
    });
  };

  // Function to calculate age from date of birth
  const calculateAge = (birthDate: string): number => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto" }}>
      <Paper sx={{ p: 3, mb: 3, bgcolor: "grey.50", borderRadius: 2 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Person color="primary" />
          Patient Information
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please provide accurate information for patient registration. All
          fields marked with * are required.
        </Typography>
      </Paper>

      <form onSubmit={addPatient}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name *"
              placeholder="John Doe"
              fullWidth
              value={name}
              onChange={({ target }) => setName(target.value)}
              error={!!errors.name}
              helperText={errors.name}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Social Security Number *"
              placeholder="123-45-6789"
              fullWidth
              value={ssn}
              onChange={({ target }) => handleSsnChange(target.value)}
              error={!!errors.ssn}
              helperText={errors.ssn || "Format: XXX-XX-XXXX"}
              disabled={isLoading}
              inputProps={{ maxLength: 11 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Badge color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Date of Birth *"
              fullWidth
              value={dateOfBirth}
              onChange={({ target }) => setDateOfBirth(target.value)}
              error={!!errors.dateOfBirth}
              helperText={
                errors.dateOfBirth ||
                (dateOfBirth ? `Age: ${calculateAge(dateOfBirth)} years` : "")
              }
              disabled={isLoading}
              type="date"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday color="action" />
                  </InputAdornment>
                ),
                inputProps: {
                  max: new Date().toISOString().split("T")[0],
                },
              }}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Occupation *"
              placeholder="Astrophysicist"
              fullWidth
              value={occupation}
              onChange={({ target }) => setOccupation(target.value)}
              error={!!errors.occupation}
              helperText={errors.occupation}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Work color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Gender *"
              select
              fullWidth
              value={gender}
              onChange={handleGenderChange}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Wc color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            >
              {genderOptions.map((option) => (
                <MenuItem
                  value={option.value}
                  key={option.value}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ color: option.color }}>{option.icon}</Box>
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {name && ssn && dateOfBirth && occupation && (
          <Paper sx={{ p: 3, mb: 3, bgcolor: "primary.50", borderRadius: 2 }}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: "primary.main" }}
            >
              Patient Summary
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Chip
                icon={<Person />}
                label={`Name: ${name}`}
                variant="outlined"
                color="primary"
                size="small"
              />
              <Chip
                icon={<CalendarToday />}
                label={`Age: ${calculateAge(dateOfBirth)} years`}
                variant="outlined"
                color="info"
                size="small"
              />
              <Chip
                icon={<Work />}
                label={`Occupation: ${occupation}`}
                variant="outlined"
                color="success"
                size="small"
              />
              <Chip
                label={`Gender: ${gender}`}
                variant="outlined"
                color="secondary"
                size="small"
              />
            </Stack>
          </Paper>
        )}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 3 }}
        >
          <Button
            color="error"
            variant="outlined"
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            startIcon={<Cancel />}
            sx={{
              minWidth: 120,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "error.50",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading || !name || !ssn || !dateOfBirth || !occupation}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Save />}
            sx={{
              minWidth: 120,
              borderRadius: 2,
              background: "linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
              },
            }}
          >
            {isLoading ? "Adding..." : "Add Patient"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddPatientForm;
