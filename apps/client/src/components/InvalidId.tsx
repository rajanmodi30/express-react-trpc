import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";

type ErrorComponent = {
  error: string;
};

export const InvalidId = (props: ErrorComponent) => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ display: "flex", p: 2, flexDirection: "column" }}>
              {props.error}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
