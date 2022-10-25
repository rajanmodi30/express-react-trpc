import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const mdTheme = createTheme();

export const Admin = () => {
  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Header />
          <Sidebar />
          <Outlet />
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
};
