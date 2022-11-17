import {
  Button,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { Loader } from "../../components/Loader";
import { useAuthStore } from "../../store/auth";
import { trpc } from "../../utils/trpc";
import { InvalidId } from "../../components/InvalidId";
export const EditUser = () => {
  const params = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (params.id === undefined) {
    return (
      <>
        <InvalidId error="Invalid User Id" />
      </>
    );
  }

  if (user && parseInt(params.id) === user.id) {
    //TODO redirect to edit profile user page
  }

  const { data, isSuccess, error, isError, isLoading } =
    trpc.auth.users.details.useQuery({
      id: parseInt(params.id),
    });

  useEffect(() => {
    if (isSuccess && data.data) {
      setValues({
        email: data?.data?.email,
        firstName: data?.data?.firstName,
        lastName: data?.data?.lastName,
      });
    }
  }, [data]);

  const initialValues = {
    firstName: data?.data?.firstName || "",
    lastName: data?.data?.lastName || "",
    email: data?.data?.email || "",
  };

  const editSchema = object().shape({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
  });

  const { mutate } = trpc.auth.users.update.useMutation();

  const {
    handleSubmit,
    errors,
    values,
    isSubmitting,
    setValues,
    touched,
    handleChange,
    resetForm,
  } = useFormik({
    validationSchema: editSchema,
    initialValues: initialValues,
    onSubmit: async (values) => {
      event?.preventDefault();
      if (data?.data?.id) {
        mutate(
          { ...values, id: data.data.id },
          {
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
          }
        );
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <>
        <InvalidId error={error.message} />
      </>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid justifyContent="center" container spacing={3}>
          <Paper sx={{ display: "flex", p: 4, flexDirection: "column" }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400 }}
            >
              <Grid
                sx={{ py: 4 }}
                container
                spacing={0}
                justifyContent="center"
              >
                <Typography variant="h5">Edit Profile</Typography>
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
                <Grid item xs={12} sm={12}>
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
                      Change
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
