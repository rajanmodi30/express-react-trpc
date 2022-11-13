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
