import {
  Button,
  TextField,
  Stack,
  MenuItem,
  Autocomplete,
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  Divider,
  InputAdornment,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  Fade,
} from "@mui/material";
import {
  MedicalServices,
  CalendarToday,
  Person,
  Assignment,
  HealthAndSafety,
  Work,
  LocalHospital,
  Save,
  Cancel,
  CheckCircle,
  Warning,
  Error,
  Info,
  Description,
  Search,
} from "@mui/icons-material";
import { useState, SyntheticEvent } from "react";
import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";
import { useDiagnoses } from "../../hooks/useDiagnoses";

type Props = {
  patientId: string;
  onCancel: () => void;
  onSubmit: (values: EntryFormValues, id: string) => void;
  isLoading?: boolean;
};

const AddEntryForm = ({
  patientId,
  onCancel,
  onSubmit,
  isLoading = false,
}: Props) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);

  // Specific to HealthCheck entry
  const [healthCheckRating, setHealthCheckRating] = useState<
    HealthCheckRating | ""
  >("");

  // Specific to OccupationalHealthcare entry
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  // Specific to Hospital entry
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const {
    diagnoses: availableDiagnoses,
    loading: diagnosesLoading,
    error: diagnosesError,
  } = useDiagnoses();

  // Validation form function
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!date) {
      newErrors.date = "Date is required";
    } else if (new Date(date) > new Date()) {
      newErrors.date = "Date cannot be in the future";
    }
    if (!specialist.trim()) {
      newErrors.specialist = "Specialist is required";
    }

    // Type-specific validations
    switch (type) {
      case EntryType.HealthCheck:
        if (healthCheckRating === "") {
          newErrors.healthCheckRating = "Health check rating is required";
        }
        break;
      case EntryType.OccupationalHealthcare:
        if (!employerName.trim()) {
          newErrors.employerName = "Employer name is required";
        }
        if (sickLeaveStartDate && sickLeaveEndDate) {
          if (new Date(sickLeaveStartDate) > new Date(sickLeaveEndDate)) {
            newErrors.sickLeave = "Start date must be before end date";
          }
        }
        break;
      case EntryType.Hospital:
        if (!dischargeDate) {
          newErrors.dischargeDate = "Discharge date is required";
        }
        if (!dischargeCriteria.trim()) {
          newErrors.dischargeCriteria = "Discharge criteria is required";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    let entry: EntryFormValues;

    switch (type) {
      case EntryType.HealthCheck:
        entry = {
          description,
          date,
          specialist,
          diagnosisCodes: diagnoses,
          type: "HealthCheck",
          healthCheckRating: healthCheckRating as HealthCheckRating,
        };
        break;

      case EntryType.OccupationalHealthcare:
        entry = {
          description,
          date,
          specialist,
          diagnosisCodes: diagnoses,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStartDate &&
            sickLeaveEndDate && {
              sickLeave: {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate,
              },
            }),
        };
        break;

      case EntryType.Hospital:
        entry = {
          description,
          date,
          specialist,
          diagnosisCodes: diagnoses,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;

      default:
        return;
    }

    onSubmit(entry, patientId);
  };

  // Options for health check ratings
  const healthCheckRatingOptions = [
    {
      value: HealthCheckRating.Healthy,
      label: "Healthy",
      icon: <CheckCircle />,
      color: "success",
    },
    {
      value: HealthCheckRating.LowRisk,
      label: "Low Risk",
      icon: <Info />,
      color: "info",
    },
    {
      value: HealthCheckRating.HighRisk,
      label: "High Risk",
      icon: <Warning />,
      color: "warning",
    },
    {
      value: HealthCheckRating.CriticalRisk,
      label: "Critical Risk",
      icon: <Error />,
      color: "error",
    },
  ];

  // Options for entry types
  const entryTypeOptions = [
    {
      value: EntryType.HealthCheck,
      label: "Health Check",
      icon: <HealthAndSafety />,
      color: "success",
      description: "General health examination",
    },
    {
      value: EntryType.OccupationalHealthcare,
      label: "Occupational Healthcare",
      icon: <Work />,
      color: "info",
      description: "Work-related health services",
    },
    {
      value: EntryType.Hospital,
      label: "Hospital",
      icon: <LocalHospital />,
      color: "error",
      description: "Hospital admission and discharge",
    },
  ];

  const resetSpecificFields = () => {
    setHealthCheckRating("");
    setEmployerName("");
    setSickLeaveStartDate("");
    setSickLeaveEndDate("");
    setDischargeDate("");
    setDischargeCriteria("");
  };

  const handleTypeChange = (newType: EntryType) => {
    setType(newType);
    resetSpecificFields();
  };

  // Function to get type information based on selected type
  const getTypeInfo = () => {
    return entryTypeOptions.find((option) => option.value === type);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto" }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: `${getTypeInfo()?.color}.light`,
              color: `${getTypeInfo()?.color}.main`,
              width: 50,
              height: 50,
            }}
          >
            {getTypeInfo()?.icon}
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              New {getTypeInfo()?.label} Entry
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {getTypeInfo()?.description}
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <form onSubmit={addEntry}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <MedicalServices color="primary" />
                Entry Type Selection
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                {entryTypeOptions.map((option) => (
                  <Grid item xs={12} md={4} key={option.value}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        border:
                          type === option.value ? "2px solid" : "1px solid",
                        borderColor:
                          type === option.value
                            ? `${option.color}.main`
                            : "grey.300",
                        bgcolor:
                          type === option.value
                            ? `${option.color}.50`
                            : "white",
                        "&:hover": {
                          transform: "translateY(-2px)",
                          boxShadow: 2,
                        },
                      }}
                      onClick={() => handleTypeChange(option.value)}
                    >
                      <CardContent sx={{ textAlign: "center", p: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${option.color}.light`,
                            color: `${option.color}.main`,
                            mx: "auto",
                            mb: 1,
                          }}
                        >
                          {option.icon}
                        </Avatar>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {option.label}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {option.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Assignment color="primary" />
                Basic Information
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    label="Description *"
                    placeholder="Detailed description of the medical entry"
                    fullWidth
                    multiline
                    rows={3}
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                    error={!!errors.description}
                    helperText={errors.description}
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Description color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date *"
                    fullWidth
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                    error={!!errors.date}
                    helperText={errors.date}
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
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    label="Specialist *"
                    placeholder="Dr. Smith"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                    error={!!errors.specialist}
                    helperText={errors.specialist}
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="action" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={availableDiagnoses}
                    getOptionLabel={(option) =>
                      `${option.code} - ${option.name}`
                    }
                    value={availableDiagnoses.filter((d) =>
                      diagnoses.includes(d.code)
                    )}
                    onChange={(_, newValue) => {
                      setDiagnoses(newValue.map((d) => d.code));
                    }}
                    loading={diagnosesLoading}
                    disabled={isLoading}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Diagnoses"
                        placeholder="Select relevant diagnoses"
                        helperText={
                          diagnosesError ||
                          "Optional: Select relevant diagnoses"
                        }
                        error={!!diagnosesError}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <>
                              <InputAdornment position="start">
                                <Search color="action" />
                              </InputAdornment>
                              {params.InputProps.startAdornment}
                            </>
                          ),
                        }}
                      />
                    )}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option.code}
                          {...getTagProps({ index })}
                          key={option.code}
                        />
                      ))
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Fade in timeout={300}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {getTypeInfo()?.icon}
                  {getTypeInfo()?.label} Specific Information
                </Typography>

                {type === EntryType.HealthCheck && (
                  <Box sx={{ mt: 2 }}>
                    <TextField
                      label="Health Check Rating *"
                      select
                      fullWidth
                      value={healthCheckRating}
                      onChange={({ target }) =>
                        setHealthCheckRating(
                          target.value === ""
                            ? ""
                            : (Number(target.value) as HealthCheckRating)
                        )
                      }
                      error={!!errors.healthCheckRating}
                      helperText={errors.healthCheckRating}
                      disabled={isLoading}
                    >
                      <MenuItem value="">
                        <em>Select a rating</em>
                      </MenuItem>
                      {healthCheckRatingOptions.map((rating) => (
                        <MenuItem key={rating.value} value={rating.value}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box sx={{ color: `${rating.color}.main` }}>
                              {rating.icon}
                            </Box>
                            {rating.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                )}

                {type === EntryType.OccupationalHealthcare && (
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          label="Employer Name *"
                          placeholder="ABC Company"
                          fullWidth
                          value={employerName}
                          onChange={({ target }) =>
                            setEmployerName(target.value)
                          }
                          error={!!errors.employerName}
                          helperText={errors.employerName}
                          disabled={isLoading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Work color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom>
                          Sick Leave (Optional)
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="Start Date"
                              type="date"
                              fullWidth
                              value={sickLeaveStartDate}
                              onChange={({ target }) =>
                                setSickLeaveStartDate(target.value)
                              }
                              disabled={isLoading}
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CalendarToday color="action" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              label="End Date"
                              type="date"
                              fullWidth
                              value={sickLeaveEndDate}
                              onChange={({ target }) =>
                                setSickLeaveEndDate(target.value)
                              }
                              disabled={isLoading}
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CalendarToday color="action" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                        {errors.sickLeave && (
                          <Typography
                            variant="body2"
                            color="error"
                            sx={{ mt: 1 }}
                          >
                            {errors.sickLeave}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {type === EntryType.Hospital && (
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Discharge Date *"
                          type="date"
                          fullWidth
                          value={dischargeDate}
                          onChange={({ target }) =>
                            setDischargeDate(target.value)
                          }
                          error={!!errors.dischargeDate}
                          helperText={errors.dischargeDate}
                          disabled={isLoading}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarToday color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          label="Discharge Criteria *"
                          placeholder="Patient recovered and stable"
                          fullWidth
                          multiline
                          rows={3}
                          value={dischargeCriteria}
                          onChange={({ target }) =>
                            setDischargeCriteria(target.value)
                          }
                          error={!!errors.dischargeCriteria}
                          helperText={errors.dischargeCriteria}
                          disabled={isLoading}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Assignment color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Fade>
          </Grid>

          {description && date && specialist && (
            <Grid item xs={12}>
              <Fade in timeout={300}>
                <Paper sx={{ p: 3, bgcolor: "primary.50", borderRadius: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "primary.main" }}
                  >
                    Entry Summary
                  </Typography>
                  <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                    <Chip
                      icon={getTypeInfo()?.icon}
                      label={`Type: ${getTypeInfo()?.label}`}
                      variant="outlined"
                    />
                    <Chip
                      icon={<CalendarToday />}
                      label={`Date: ${date}`}
                      color="info"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Person />}
                      label={`Specialist: ${specialist}`}
                      color="success"
                      variant="outlined"
                    />
                    {diagnoses.length > 0 && (
                      <Chip
                        icon={<Assignment />}
                        label={`Diagnoses: ${diagnoses.length}`}
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </Paper>
              </Fade>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 3 }}
        >
          <Button
            variant="outlined"
            color="error"
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
            disabled={isLoading || !description || !date || !specialist}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Save />}
            sx={{
              minWidth: 120,
              borderRadius: 2,
              background: "linear-gradient(45deg, #4facfe 30%, #00f2fe 90%)",
              "&:hover": {
                background: "linear-gradient(45deg, #2196f3 30%, #4facfe 90%)",
              },
            }}
          >
            {isLoading ? "Adding Entry..." : "Add Entry"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default AddEntryForm;
