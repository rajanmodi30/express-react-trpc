import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { AppBarProps } from "../utils/types";
import { useThemeStore } from "../store/theme";
import { ProfileMenu } from "./ProfileMenu";
import { Divider, Stack } from "@mui/material";
import { drawerWidth } from "../utils";
import { BreadcrumbsToolBar } from "./Breadcrumbs";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
//TODO notifications bar
export const TopBar = () => {
  const { openToggleBar, toggleOpenBar, currentSideBarTitle } = useThemeStore();

  return (
    <>
      <AppBar color="inherit" position="fixed" open={openToggleBar}>
        <Toolbar
          sx={{
            pr: "24px",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={toggleOpenBar}
            sx={{
              marginRight: "30px",
              color: "#9da5b1",
              ...(openToggleBar && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {currentSideBarTitle}
          </Typography>
          <Stack flexDirection="row" justifyContent="space-between">
            <IconButton color="inherit" style={{ marginRight: 15 }}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <ProfileMenu />
          </Stack>
        </Toolbar>
        <Divider />
        <BreadcrumbsToolBar />
      </AppBar>
    </>
  );
};
