import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";
import AddEntryForm from "../AddEntryModal/AddEntryForm";
import { EntryFormValues } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues, id: string) => Promise<void>;
  error?: string;
  patientId: string;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  patientId,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        patientId={patientId}
      />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
