import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { trpc } from "../../utils/trpc";

const addSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
});

export const AddUser = () => {
  const { mutate, isError, error, isSuccess, data } =
    trpc.auth.users.store.useMutation();

  const {
    handleSubmit,
    errors,
    values,
    isSubmitting,
    touched,
    handleChange,
    setValues,
  } = useFormik({
    validationSchema: addSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: async (values) => {
      event?.preventDefault();
      mutate(values);
    },
  });

  if (isError) {
    toast.error(error.message);
  }

  if (isSuccess) {
    if (!data.status) {
      toast.error(data.message);
    } else {
      // setValues({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      // });
      toast.success(data.message);
    }
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ display: "flex", p: 2, flexDirection: "column" }}>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      onChange={handleChange}
                      value={values.firstName}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      autoComplete="given-name"
                      variant="standard"
                      onChange={handleChange}
                      value={values.lastName}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      variant="standard"
                      onChange={handleChange}
                      value={values.email}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add
                </Button>
              </Box>{" "}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
