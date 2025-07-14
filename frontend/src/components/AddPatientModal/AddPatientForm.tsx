import { useState, SyntheticEvent } from "react";
import {
  TextField,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find((g) => g.toString() === value);
      if (gender) {
        setGender(gender);
      }
    }
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender,
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Name"
          placeholder="John Doe"
          fullWidth
          value={name}
          onChange={({ target }) => setName(target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Social security number"
          placeholder="123-45-6789"
          fullWidth
          value={ssn}
          onChange={({ target }) => setSsn(target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dateOfBirth}
          onChange={({ target }) => setDateOfBirth(target.value)}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Occupation"
          placeholder="Astrophysicist"
          fullWidth
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Select
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
          style={{ marginBottom: "10px" }}
        >
          {genderOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Button
            color="warning"
            variant="outlined"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            Add
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default AddPatientForm;
