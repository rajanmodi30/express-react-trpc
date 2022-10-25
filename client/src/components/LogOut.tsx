import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth";
import { trpc } from "../utils/trpc";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

export const LogOut = () => {
  const navigate = useNavigate();
  const { removeAll } = useAuthStore();

  const logOut = () => {
    mutate();
  };

  const { mutate, isSuccess, error, data, isError } =
    trpc.auth.logOut.useMutation();

  if (isSuccess) {
    if (data.status) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    removeAll();
    navigate("/");
  } else if (isError) {
    toast.error(error.message);
    if (error.data?.code === "UNAUTHORIZED") {
      removeAll();
      navigate("/");
    }
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItemButton onClick={handleClickOpen}>
        <ListItemIcon>
          <LoginIcon />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Log out?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={logOut} autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
