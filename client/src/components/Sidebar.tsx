import { Divider, Drawer, IconButton, List, Toolbar } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { SideBarMenuItems } from "../pages/SideBarMenuItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { AdminThemeContext } from "../contexts/AdminContext";
import { useContext } from "react";
import { useThemeStore } from "../store/theme";
import Logo from "/logo.png";
export const Sidebar = () => {
  const { openToggleBar, toggleOpenBar } = useThemeStore();
  const { drawerWidth } = useContext(AdminThemeContext);

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  }));
  return (
    // <Drawer variant="permanent" open={openToggleBar}>
    //   <Toolbar
    //     sx={{
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "space-between",
    //       p: [1],
    //     }}
    //   >
    //     {openToggleBar && (
    //       <img style={{ padding: 5 }} src={Logo} height="auto" width={80} />
    //     )}
    //     <IconButton onClick={toggleOpenBar}>
    //       <ChevronLeftIcon />
    //     </IconButton>
    //   </Toolbar>
    //   <Divider />
    //   <List component="nav">
    //     <SideBarMenuItems />
    //   </List>
    // </Drawer>
    <Drawer
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
      <DrawerHeader>
        <IconButton onClick={toggleOpenBar}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List>
        <SideBarMenuItems />
      </List>
    </Drawer>
  );
};
