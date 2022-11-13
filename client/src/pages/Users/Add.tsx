import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
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

  const { handleSubmit, errors, values, isSubmitting, touched, handleChange } =
    useFormik({
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
              sx={{ mt: 1, maxWidth: 500 }}
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
            </Box>
          </Paper>
        </Grid>
      </Container>
    </>
  );
};
