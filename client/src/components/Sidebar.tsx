import { Divider, IconButton, List, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { mainListItems } from "../pages/MenuItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AdminThemeContext } from "../contexts/AdminContext";
import { useContext } from "react";
import { useThemeStore } from "../store/theme";

export const Sidebar = () => {
  const { openToggleBar, toggleOpenBar } = useThemeStore();
  const { drawerWidth } = useContext(AdminThemeContext);

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  }));

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
      <List component="nav">{mainListItems}</List>
    </Drawer>
  );
};
