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
          <Grid xs={12} container spacing={2}>
            <Grid xs={6}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h6">Something Went Wrong</Typography>
              <Button component={Link} to="/" variant="contained">
                Go Back To Home
              </Button>{" "}
            </Grid>
            <Grid xs={6}>
              <img
                src="https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_1280.png"
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
