import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FallbackProps } from "react-error-boundary";

export const Error = (ErrorBoundaryFallBack: FallbackProps) => {
  const navigate = useNavigate();

  const resetAndNavigate = () => {
    ErrorBoundaryFallBack.resetErrorBoundary;
    navigate("");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Grid xs={12} container>
            <Grid item xs={12}>
              <Typography variant="h3">OOPS Something Went Wrong</Typography>
              <pre>{ErrorBoundaryFallBack.error.message}</pre>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={resetAndNavigate} variant="contained">
                Go Back To Home
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
