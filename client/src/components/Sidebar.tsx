import { Divider, Drawer, IconButton, List, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mainListItems, secondaryListItems } from "../pages/MenuItems";
import { useAuthStore } from "../store/auth";
import { trpc } from "../utils/trpc";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const Sidebar = () => {
  const { openToggleBar, toggleOpenBar } = useAuthStore();

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
  }

  if (isError) {
    toast.error(error.message);
    if (error.data?.code === "UNAUTHORIZED") {
      removeAll();
      navigate("/");
    }
  }

  return (
    <Drawer variant="permanent" open={openToggleBar}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleOpenBar}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        <Divider sx={{ my: 1 }} />
        {secondaryListItems}
      </List>
    </Drawer>
  );
};
