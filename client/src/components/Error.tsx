import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Error = () => {
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
            </Grid>
            <Grid item xs={12}>
              <Button href="/" variant="contained">
                Go Back To Home
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
