import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth";
import { UPLOADS_TYPES } from "../../utils";
import { trpc } from "../../utils/trpc";
import EditIcon from "@mui/icons-material/Edit";

export const Profile = () => {
  const { user, setUser } = useAuthStore();

  const uploadManager = trpc.auth.upload.linkGenerate.useMutation();
  const [selectedImage, setSelectedImage] = useState<any>(user?.profilePicture);
  const [imageBlob, setImageBlob] = useState<any>("");

  const { mutate } = trpc.auth.updateProfile.useMutation();

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
    onSubmit: (values, { setSubmitting }) => {
      uploadManager.mutate(
        {
          name: imageBlob.name,
          type: imageBlob.type,
          destination: UPLOADS_TYPES.PROFILE,
        },
        {
          onSuccess: async (response) => {
            const { status, data } = response;
            if (status) {
              await fetch(data.url, {
                method: "PUT",
                body: imageBlob,
              });
              mutate(
                {
                  ...values,
                  profilePicture: data.key,
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
                  onError: (error) => {
                    console.error(error);
                    setSubmitting(false);
                  },
                }
              );
            }
          },
        }
      );
    },
  });

  const addNewImage = (image: any) => {
    if (image) {
      setSelectedImage(URL.createObjectURL(image[0]));
      setImageBlob(image[0]);
    }
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={0} justifyContent="center">
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
                spacing={2}
                justifyContent="center"
              >
                <Typography variant="h5"> Profile</Typography>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <Grid container justifyContent="center">
                    <input
                      accept="image/*"
                      type="file"
                      id="select-image"
                      style={{ display: "none" }}
                      onChange={(e) => addNewImage(e.target.files)}
                    />

                    <label htmlFor="select-image">
                      <Tooltip title="Change Profile Picture" placement="top">
                        <Avatar
                          sx={{ width: 68, height: 68 }}
                          alt={user?.fullName}
                          src={selectedImage}
                        />
                      </Tooltip>
                    </label>
                  </Grid>
                </Grid>
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
                      Update
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
