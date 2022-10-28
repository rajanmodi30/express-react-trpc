import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AdminThemeContext, themeDefaults } from "../contexts/AdminContext";

export const Admin = () => {
  return (
    <AdminThemeContext.Provider value={themeDefaults}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box
          component="main"
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
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </AdminThemeContext.Provider>
  );
};
