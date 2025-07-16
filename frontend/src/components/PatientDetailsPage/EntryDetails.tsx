import {
  Box,
  Typography,
  Chip,
  Card,
  CardContent,
  Avatar,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import {
  HealthAndSafety,
  Work,
  LocalHospital,
  Person,
  CalendarToday,
  MedicalServices,
  Assignment,
  CheckCircle,
  Warning,
  Error,
  Info,
} from "@mui/icons-material";
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
  //Function to get the icon based on the entry type
  const getEntryIcon = () => {
    switch (entry.type) {
      case "HealthCheck":
        return <HealthAndSafety />;
      case "OccupationalHealthcare":
        return <Work />;
      case "Hospital":
        return <LocalHospital />;
      default:
        return <MedicalServices />;
    }
  };

  // Function to get the color based on the entry type
  const getEntryColor = () => {
    switch (entry.type) {
      case "HealthCheck":
        return "success";
      case "OccupationalHealthcare":
        return "info";
      case "Hospital":
        return "error";
      default:
        return "primary";
    }
  };

  // Function to get the title based on the entry type
  const getEntryTypeTitle = () => {
    switch (entry.type) {
      case "HealthCheck":
        return "Health Check";
      case "OccupationalHealthcare":
        return "Occupational Healthcare";
      case "Hospital":
        return "Hospital Visit";
      default:
        return "Medical Entry";
    }
  };

  // Function to get the health rating icon
  const getHealthRatingIcon = (rating: number) => {
    switch (rating) {
      case 0:
        return <CheckCircle color="success" />;
      case 1:
        return <Info color="info" />;
      case 2:
        return <Warning color="warning" />;
      case 3:
        return <Error color="error" />;
      default:
        return <Info color="action" />;
    }
  };

  // Function to get the health rating text
  const getHealthRatingText = (rating: number) => {
    switch (rating) {
      case 0:
        return "Healthy";
      case 1:
        return "Low Risk";
      case 2:
        return "High Risk";
      case 3:
        return "Critical Risk";
      default:
        return "Unknown";
    }
  };

  // Function to get the health rating color
  const getHealthRatingColor = (rating: number) => {
    switch (rating) {
      case 0:
        return "success";
      case 1:
        return "info";
      case 2:
        return "warning";
      case 3:
        return "error";
      default:
        return "default";
    }
  };

  // Function to get the color for the entry based on its type
  const renderEntrySpecificInfo = () => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <Paper sx={{ p: 2, mt: 2, bgcolor: "success.50", borderRadius: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: "success.light", color: "success.main" }}>
                {getHealthRatingIcon(entry.healthCheckRating)}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  Health Assessment
                </Typography>
                <Chip
                  icon={getHealthRatingIcon(entry.healthCheckRating)}
                  label={getHealthRatingText(entry.healthCheckRating)}
                  color={getHealthRatingColor(entry.healthCheckRating)}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Stack>
          </Paper>
        );

      case "OccupationalHealthcare":
        return (
          <Paper sx={{ p: 2, mt: 2, bgcolor: "info.50", borderRadius: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "info.light", color: "info.main" }}>
                  <Work />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Employer Information
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {entry.employerName}
                  </Typography>
                </Box>
              </Box>

              {entry.sickLeave && (
                <Box sx={{ pl: 7 }}>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="body2" fontWeight="medium" gutterBottom>
                    Sick Leave Period
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2">
                      {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Stack>
          </Paper>
        );

      case "Hospital":
        return (
          <Paper sx={{ p: 2, mt: 2, bgcolor: "error.50", borderRadius: 2 }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "error.light", color: "error.main" }}>
                  <LocalHospital />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Discharge Information
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ pl: 7 }}>
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarToday
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2">
                      <strong>Date:</strong> {entry.discharge.date}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                  >
                    <Assignment
                      sx={{ fontSize: 16, color: "text.secondary", mt: 0.5 }}
                    />
                    <Typography variant="body2">
                      <strong>Criteria:</strong> {entry.discharge.criteria}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        );

      default:
        return assertNever(entry);
    }
  };

  const renderDiagnosisCodes = () => {
    if (!entry.diagnosisCodes || entry.diagnosisCodes.length === 0) return null;

    return (
      <Paper sx={{ p: 2, mt: 2, bgcolor: "grey.50", borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: "warning.light", color: "warning.main" }}>
            <Assignment />
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">
              Diagnoses
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {entry.diagnosisCodes.length} diagnosis code(s)
            </Typography>
          </Box>
        </Box>

        <List sx={{ pt: 0 }}>
          {entry.diagnosisCodes.map((code) => (
            <ListItem key={code} sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "warning.main",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <strong>{code}</strong> - {getDiagnosisName(code)}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: `${getEntryColor()}.light`,
              color: `${getEntryColor()}.main`,
              width: 50,
              height: 50,
            }}
          >
            {getEntryIcon()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              {getEntryTypeTitle()}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mt: 0.5 }}
            >
              <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="body2" color="text.secondary">
                {entry.date}
              </Typography>
            </Stack>
          </Box>
          <Chip
            label={entry.type}
            color={getEntryColor()}
            variant="outlined"
            size="small"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {entry.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Person sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Specialist: {entry.specialist}
            </Typography>
          </Box>
        </Box>

        {renderEntrySpecificInfo()}

        {renderDiagnosisCodes()}
      </CardContent>
    </Card>
  );
};

export default EntryDetails;
