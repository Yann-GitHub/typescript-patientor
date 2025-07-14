import { useState, SyntheticEvent } from "react";
import { TextField, MenuItem, Button, Stack } from "@mui/material";
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

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (Object.values(Gender).includes(value as Gender)) {
      setGender(value as Gender);
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
        <TextField
          label="Gender"
          select
          fullWidth
          value={gender}
          onChange={handleGenderChange}
          sx={{ mt: 2 }}
        >
          {genderOptions.map((option) => (
            <MenuItem value={option.value} key={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

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
