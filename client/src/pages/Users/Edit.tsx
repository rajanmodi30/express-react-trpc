import { Container, Grid, Paper } from "@mui/material";

export const EditUser = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ display: "flex", p: 2, flexDirection: "column" }}>
              Add User
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
