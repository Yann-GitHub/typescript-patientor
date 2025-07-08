// components/EntryDetails/EntryDetails.tsx
import { Box, Typography, Chip } from "@mui/material";
import { Entry } from "../../types";
import { assertNever } from "../../utils/typeGuards";

interface EntryDetailsProps {
  entry: Entry;
  getDiagnosisName: (code: string) => string;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({
  entry,
  getDiagnosisName,
}) => {
  const renderEntrySpecificInfo = () => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <Box sx={{ marginTop: 1 }}>
            <Chip
              label={`Health Rating: ${entry.healthCheckRating}`}
              color={entry.healthCheckRating === 0 ? "success" : "warning"}
              size="small"
            />
          </Box>
        );

      case "OccupationalHealthcare":
        return (
          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2">
              <strong>Employer:</strong> {entry.employerName}
            </Typography>
            {entry.sickLeave && (
              <Typography variant="body2">
                <strong>Sick Leave:</strong> {entry.sickLeave.startDate} -{" "}
                {entry.sickLeave.endDate}
              </Typography>
            )}
          </Box>
        );

      case "Hospital":
        return (
          <Box sx={{ marginTop: 1 }}>
            <Typography variant="body2">
              <strong>Discharge:</strong> {entry.discharge.date}
            </Typography>
            <Typography variant="body2">
              <strong>Criteria:</strong> {entry.discharge.criteria}
            </Typography>
          </Box>
        );

      //   default:
      //     return null;
      default:
        return assertNever(entry);
    }
  };

  const renderDiagnosisCodes = () => {
    if (!entry.diagnosisCodes || entry.diagnosisCodes.length === 0) return null;

    return (
      <Box sx={{ marginTop: 1 }}>
        <Typography variant="body2" fontWeight="bold">
          Diagnoses:
        </Typography>
        <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
          {entry.diagnosisCodes.map((code) => (
            <li key={code} style={{ marginBottom: "4px" }}>
              <strong>{code}</strong> - {getDiagnosisName(code)}
            </li>
          ))}
        </ul>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        padding: 2,
        marginBottom: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <Typography variant="body1" fontWeight="bold">
        {entry.date} - {entry.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Specialist: {entry.specialist}
      </Typography>

      {renderEntrySpecificInfo()}
      {renderDiagnosisCodes()}
    </Box>
  );
};

export default EntryDetails;
