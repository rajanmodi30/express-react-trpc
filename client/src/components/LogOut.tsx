import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link, MenuItem, Typography } from "@mui/material";
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

  const { mutate, isSuccess, data } = trpc.auth.logOut.useMutation();

  if (isSuccess) {
    if (data.status) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    removeAll();
    navigate("/");
  }

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>
        <Typography textAlign="center">Log Out</Typography>
      </MenuItem>
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
    </>
  );
};
