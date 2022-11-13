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
import { Breadcrumbs, Divider, Link, Stack } from "@mui/material";
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const TopBar = () => {
  const { openToggleBar, toggleOpenBar, currentSideBarTitle } = useThemeStore();

  return (
    <>
      <AppBar color="inherit" position="absolute" open={openToggleBar}>
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
        <Toolbar
          sx={{
            justifyContent: "flex-start",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/admin/users">
              Users
            </Link>

            <Typography color="text.primary">Add </Typography>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
    </>
  );
};
