import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { trpc } from "../../utils/trpc";

export const AddUser = () => {
  const { mutate } = trpc.auth.users.store.useMutation();
  const addSchema = object().shape({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
  });

  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const {
    handleSubmit,
    errors,
    values,
    isSubmitting,
    touched,
    handleChange,
    resetForm,
  } = useFormik({
    validationSchema: addSchema,
    initialValues: initialValues,
    onSubmit: async (values) => {
      event?.preventDefault();
      mutate(values, {
        onSuccess: (data) => {
          if (!data.status) {
            toast.error(data.message);
          } else {
            toast.success(data.message);
            navigate("/admin/users");
          }
        },
        onError: (error) => {
          toast.error(error.message);
        },
      });
    },
  });

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={0} justifyContent="center" item xs={12}>
          <Paper sx={{ display: "flex", p: 4, flexDirection: "column" }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400 }}
            >
              <Grid sx={{ py: 4 }} container justifyContent="center">
                <Typography variant="h5">Add User</Typography>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="given-name"
                    variant="outlined"
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
                    variant="outlined"
                    onChange={handleChange}
                    value={values.lastName}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Button
                      variant="contained"
                      color="download"
                      onClick={() => {
                        resetForm();
                      }}
                      sx={{ textTransform: "none" }}
                    >
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="contained"
                      sx={{ textTransform: "none", alignSelf: "flex-end" }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};
