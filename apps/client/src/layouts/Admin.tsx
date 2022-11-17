import { Box, CssBaseline, styled, Toolbar } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { TopBar } from "../components/TopBar";
import { Loader } from "../components/Loader";
import { Sidebar } from "../components/Sidebar";
import { useThemeStore } from "../store/theme";
import { drawerWidth } from "../utils";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const Admin = () => {
  const { openToggleBar } = useThemeStore();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar />
      <Sidebar />
      <Main
        open={openToggleBar}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <DrawerHeader />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Main>
      <Footer />
    </Box>
  );
};
