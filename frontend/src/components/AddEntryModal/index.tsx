import {
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Box,
  IconButton,
  Typography,
  Slide,
  Paper,
  Stack,
  Avatar,
  Fade,
  Chip,
} from "@mui/material";
import {
  Close,
  MedicalServices,
  Error as ErrorIcon,
  Info,
  HealthAndSafety,
  Assignment,
} from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState, useEffect } from "react";

import AddEntryForm from "../AddEntryModal/AddEntryForm";
import { EntryFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues, id: string) => Promise<void>;
  error?: string;
  patientId: string;
}

// Transition component for the dialog
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  patientId,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (values: EntryFormValues, id: string) => {
    setIsLoading(true);
    try {
      await onSubmit(values, id);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset loading state when modal closes
  useEffect(() => {
    if (!modalOpen) {
      setIsLoading(false);
    }
  }, [modalOpen]);

  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      open={modalOpen}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          maxHeight: "90vh",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Paper
          elevation={0}
          sx={{
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
            p: 3,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.1,
            },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ position: "relative", zIndex: 1 }}
          >
            <Avatar
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                width: 56,
                height: 56,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MedicalServices fontSize="large" />
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Add Medical Entry
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Record new medical information for patient
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  icon={<Assignment />}
                  label="Medical Record"
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
                <Chip
                  icon={<Info />}
                  label={`Patient ID: ${patientId.slice(0, 8)}...`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    "& .MuiChip-icon": { color: "white" },
                  }}
                />
              </Stack>
            </Box>
            <IconButton
              onClick={onClose}
              sx={{
                color: "white",
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.2)",
                  transform: "scale(1.05)",
                },
                transition: "all 0.2s ease",
              }}
            >
              <Close />
            </IconButton>
          </Stack>
        </Paper>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Message d'erreur avec animation */}
        {error && (
          <Fade in={!!error}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Alert
                severity="error"
                icon={<ErrorIcon />}
                sx={{
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "error.light",
                  "& .MuiAlert-message": {
                    fontSize: "0.95rem",
                  },
                  "& .MuiAlert-icon": {
                    fontSize: "1.2rem",
                  },
                }}
              >
                <Typography variant="subtitle2" fontWeight="medium">
                  Entry Creation Failed
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.9 }}>
                  {error}
                </Typography>
              </Alert>
            </Box>
          </Fade>
        )}

        <Box sx={{ p: 3, pb: 2 }}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "info.50",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "info.200",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar
                sx={{
                  bgcolor: "info.light",
                  color: "info.main",
                  width: 40,
                  height: 40,
                }}
              >
                <HealthAndSafety />
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="medium">
                  Medical Entry Guidelines
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select entry type and provide detailed medical information.
                  All entries are securely stored.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>

        <Box sx={{ px: 3, pb: 3 }}>
          <AddEntryForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            patientId={patientId}
            isLoading={isLoading}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;
