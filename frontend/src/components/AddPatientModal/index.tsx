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
} from "@mui/material";
import { Close, PersonAdd, Error as ErrorIcon } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

import AddPatientForm from "./AddPatientForm";
import { PatientFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
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

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog
    fullWidth
    maxWidth="md"
    open={modalOpen}
    onClose={onClose}
    TransitionComponent={Transition}
    keepMounted
    sx={{
      "& .MuiDialog-paper": {
        borderRadius: 3,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      },
    }}
  >
    <DialogTitle sx={{ p: 0 }}>
      <Paper
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          p: 3,
          borderRadius: 0,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              width: 50,
              height: 50,
            }}
          >
            <PersonAdd />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" fontWeight="bold">
              Add New Patient
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Register a new patient in the system
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: "white",
              bgcolor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.2)",
              },
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Paper>
    </DialogTitle>

    <DialogContent sx={{ p: 0 }}>
      {error && (
        <Box sx={{ p: 3, pb: 0 }}>
          <Alert
            severity="error"
            icon={<ErrorIcon />}
            sx={{
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontSize: "0.95rem",
              },
            }}
          >
            <Typography variant="subtitle2" fontWeight="medium">
              Registration Failed
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {error}
            </Typography>
          </Alert>
        </Box>
      )}

      <Box sx={{ p: 3 }}>
        <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
      </Box>
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
