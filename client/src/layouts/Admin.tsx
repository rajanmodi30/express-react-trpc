import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { TopBar } from "../components/TopBar";
import { Loader } from "../components/Loader";
import { Sidebar } from "../components/Sidebar";
import { AdminThemeContext, themeDefaults } from "../contexts/AdminContext";
import { styled } from "@mui/material";
import { useThemeStore } from "../store/theme";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `-${drawerWidth}px`,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[900],
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

export const Admin = () => {
  const { openToggleBar } = useThemeStore();

  return (
    <AdminThemeContext.Provider value={themeDefaults}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar />
        <Sidebar />
        <Main open={openToggleBar}>
          <Toolbar />
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Main>
        <Footer />
      </Box>
    </AdminThemeContext.Provider>
  );
};
