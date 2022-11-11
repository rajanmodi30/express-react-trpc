import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth";
import { trpc } from "../../utils/trpc";

export const Profile = () => {
  const { user, setUser } = useAuthStore();

  const { mutate } = trpc.auth.updateProfile.useMutation();
  const { handleChange, handleSubmit, values, errors, touched, isSubmitting } =
    useFormik({
      initialValues: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
      },
      onSubmit: (values, { setSubmitting }) => {
        mutate(
          {
            ...values,
            profilePicture: "www.google.com",
          },
          {
            onSuccess: (data) => {
              if (data.status) {
                toast.success(data.message);
                setUser(data.data);
              } else {
                toast.error(data.message);
              }
              setSubmitting(false);
            },
            onError: () => {
              setSubmitting(false);
            },
          }
        );
      },
    });
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ display: "flex", p: 2, flexDirection: "column" }}>
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/admin/users">
                  Users
                </Link>
                <Typography color="text.primary">Profile </Typography>
              </Breadcrumbs>
            </Paper>
          </Grid>
        </Grid>
      </Container>
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
                  Update
                </Button>
              </Box>{" "}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
