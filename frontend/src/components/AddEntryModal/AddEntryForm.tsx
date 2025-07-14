import {
  Button,
  TextField,
  Stack,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";
import { useDiagnoses } from "../../hooks/useDiagnoses";

type Props = {
  patientId: string;
  onCancel: () => void;
  onSubmit: (values: EntryFormValues, id: string) => void;
};

const AddEntryForm = ({ patientId, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  // const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
  //   HealthCheckRating.Healthy
  // );
  const [healthCheckRating, setHealthCheckRating] = useState<
    HealthCheckRating | ""
  >("");

  const {
    diagnoses: availableDiagnoses,
    loading: diagnosesLoading,
    error: diagnosesError,
    // getDiagnosisName,
  } = useDiagnoses();

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const entry: EntryFormValues = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnoses,
      type: "HealthCheck",
      // healthCheckRating,
      healthCheckRating: healthCheckRating as HealthCheckRating, // Forcer le type
    };
    onSubmit(entry, patientId);
  };

  const healthCheckRatingOptions = [
    { value: HealthCheckRating.Healthy, label: "Healthy" },
    { value: HealthCheckRating.LowRisk, label: "Low Risk" },
    { value: HealthCheckRating.HighRisk, label: "High Risk" },
    { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
  ];

  const entryTypeOptions = [
    { value: EntryType.HealthCheck, label: "Health Check" },
    {
      value: EntryType.OccupationalHealthcare,
      label: "Occupational Healthcare",
    },
    { value: EntryType.Hospital, label: "Hospital" },
  ];

  return (
    <div>
      <h4 style={{ marginTop: "0px" }}>New HealthCheck entry</h4>

      <div>
        <form onSubmit={addEntry}>
          <TextField
            label="Description"
            placeholder="Description of the entry"
            fullWidth
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Date"
            // placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
            sx={{ mb: 2 }}
            type="date"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputProps: {
                max: new Date().toISOString().split("T")[0],
              },
            }}
          />
          <TextField
            label="Specialist"
            placeholder="Dr. Smith"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            sx={{ mb: 2 }}
          />

          <Autocomplete
            multiple
            options={availableDiagnoses}
            getOptionLabel={(option) => `${option.code} - ${option.name}`}
            value={availableDiagnoses.filter((d) => diagnoses.includes(d.code))}
            onChange={(_, newValue) => {
              setDiagnoses(newValue.map((d) => d.code));
            }}
            loading={diagnosesLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Diagnoses"
                placeholder="Select diagnoses"
                sx={{ mb: 2 }}
                helperText={diagnosesError || "Select relevant diagnoses"}
                error={!!diagnosesError}
              />
            )}
          />
          <TextField
            label="Health Check Rating"
            select
            fullWidth
            value={healthCheckRating}
            // onChange={({ target }) =>
            //   setHealthCheckRating(Number(target.value) as HealthCheckRating)
            // }
            onChange={({ target }) =>
              setHealthCheckRating(
                target.value === ""
                  ? ""
                  : (Number(target.value) as HealthCheckRating)
              )
            }
            sx={{ mb: 2 }}
          >
            {healthCheckRatingOptions.map((rating) => (
              <MenuItem value={rating.value} key={rating.value}>
                {rating.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Type"
            select
            fullWidth
            value={type}
            onChange={({ target }) => setType(target.value as EntryType)}
            sx={{ mb: 2 }}
          >
            {entryTypeOptions.map((typeOption) => (
              <MenuItem key={typeOption.value} value={typeOption.value}>
                {typeOption.label}
              </MenuItem>
            ))}
          </TextField>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
            <Button
              variant="outlined"
              type="button"
              color="warning"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default AddEntryForm;
