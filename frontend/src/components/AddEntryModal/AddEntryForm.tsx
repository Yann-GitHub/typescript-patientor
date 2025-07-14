import { Button, TextField, Stack } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";

type props = {
  patientId: string;
  onCancel: () => void;
  onSubmit: (values: EntryFormValues, id: string) => void;
};

const AddEntryForm = ({ patientId, onCancel, onSubmit }: props) => {
  const [description, setName] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [type, setType] = useState<EntryType>(EntryType.HealthCheck);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const entry: EntryFormValues = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnoses,
      type: "HealthCheck",
      healthCheckRating,
    };
    onSubmit(entry, patientId);
  };

  return (
    <div
      style={{
        // backgroundColor: "#f9f9f9",
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "30px",
      }}
    >
      <h1 style={{ marginTop: "0px" }}>New HealthCheck entry</h1>

      <div>
        <form onSubmit={addEntry}>
          <TextField
            label="Description"
            placeholder="Description of the entry"
            fullWidth
            value={description}
            onChange={({ target }) => setName(target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Specialist"
            placeholder="Dr. Smith"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Diagnoses Codes"
            placeholder="Z57.1, Z74.3"
            fullWidth
            value={diagnoses.join(", ")}
            onChange={({ target }) =>
              setDiagnoses(target.value.split(",").map((code) => code.trim()))
            }
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Health Check Rating"
            select
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value) as HealthCheckRating)
            }
            style={{ marginBottom: "10px" }}
            SelectProps={{
              native: true,
            }}
          >
            <option value={HealthCheckRating.Healthy}>Healthy</option>
            <option value={HealthCheckRating.LowRisk}>Low Risk</option>
            <option value={HealthCheckRating.HighRisk}>High Risk</option>
            <option value={HealthCheckRating.CriticalRisk}>
              Critical Risk
            </option>
          </TextField>
          <TextField
            label="Type"
            select
            fullWidth
            value={type}
            onChange={({ target }) => setType(target.value as EntryType)}
            style={{ marginBottom: "10px" }}
            SelectProps={{
              native: true,
            }}
          >
            <option value={EntryType.HealthCheck}>Health Check</option>
            <option value={EntryType.OccupationalHealthcare}>
              Occupational Healthcare
            </option>
            <option value={EntryType.Hospital}>Hospital</option>
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
