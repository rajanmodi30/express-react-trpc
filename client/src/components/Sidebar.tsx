import { Divider, IconButton, List, Toolbar } from "@mui/material";
import { SideBarMenuItems } from "./SideBarMenuItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useThemeStore } from "../store/theme";
import Logo from "/logo.png";
import Drawer from "@mui/material/Drawer";
import { drawerWidth } from "../utils";

export const Sidebar = () => {
  const { openToggleBar, toggleOpenBar } = useThemeStore();

  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: "#3d0031",
        },
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={openToggleBar}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
        }}
      >
        <>
          <img style={{ padding: 5 }} src={Logo} height="auto" width={80} />
          <IconButton onClick={toggleOpenBar}>
            <ChevronLeftIcon style={{ color: "#9da5b1" }} />
          </IconButton>
        </>
      </Toolbar>
      <Divider />
      <List component="nav">
        <SideBarMenuItems />
      </List>
    </Drawer>
  );
};
