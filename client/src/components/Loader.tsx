import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";

export const Loader = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            Loading
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
