import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { Link } from "react-router-dom";

export const NotFound = () => {
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
          <Grid xs={12} container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">
                The page you’re looking for doesn’t exist.
              </Typography>
              <Button component={Link} to="/" variant="contained">
                Go Back To Home
              </Button>
            </Grid>
            <Grid xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
                alt=""
                width={500}
                height={250}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
