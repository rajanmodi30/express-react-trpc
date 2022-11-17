import { Container, CssBaseline, Grid, Paper } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../components/Loader";

export const Auth = () => {
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
          component={Paper}
          elevation={6}
          square
        >
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <Grid container spacing={0} justifyContent="center" item xs={12}>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
