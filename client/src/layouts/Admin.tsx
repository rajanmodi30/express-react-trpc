import { Box, ThemeProvider, CssBaseline } from "@mui/material";
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
        <Outlet />
        <Footer />
      </Box>
    </AdminThemeContext.Provider>
  );
};
