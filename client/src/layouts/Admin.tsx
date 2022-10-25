import { Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { AdminThemeContext, themeDefaults } from "../contexts/AdminContext";

const mdTheme = createTheme();

export const Admin = () => {
  return (
    <AdminThemeContext.Provider value={themeDefaults}>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header />
          <Sidebar />
          <Outlet />
          <Footer />
        </Box>
      </ThemeProvider>
    </AdminThemeContext.Provider>
  );
};
