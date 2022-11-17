import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { object, ref, string } from "yup";
import { trpc } from "../../utils/trpc";

export const ChangePassword = () => {
  const ChangePasswordRequest = object({
    oldPassword: string().required(),
    newPassword: string()
      .required()
      .notOneOf(
        [ref("oldPassword")],
        "old password and new password cant be same"
      ),
    confirmNewPassword: string()
      .required()
      .oneOf(
        [ref("newPassword")],
        "confirm password and password must be same"
      ),
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleClickShowPassword = (value: string) => {
    switch (value) {
      case "oldPassword":
        setShowOldPassword(!showOldPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmNewPassword":
        setShowConfirmNewPassword(!showConfirmNewPassword);
        break;

      default:
        console.log("wrong argument passed");
    }
  };

  const { mutate } = trpc.auth.changePassword.useMutation();

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    resetForm,
  } = useFormik({
    validationSchema: ChangePasswordRequest,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      event?.preventDefault();
      mutate(
        values,

        {
          onSuccess: (data) => {
            setSubmitting(false);
            if (data.status) {
              resetForm();
              toast.success(data.message);
            } else {
              toast.error(data.message);
            }
          },
        }
      );
    },
  });

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          <Paper sx={{ display: "flex", p: 4, flexDirection: "column" }}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400 }}
            >
              <Grid sx={{ py: 4 }} container justifyContent="center">
                <Typography variant="h5">Change Password</Typography>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="oldPassword"
                    name="oldPassword"
                    label="Old Password"
                    fullWidth
                    type={showOldPassword ? "text" : "password" || "password"}
                    variant="outlined"
                    onChange={handleChange}
                    value={values.oldPassword}
                    error={touched.oldPassword && Boolean(errors.oldPassword)}
                    helperText={touched.oldPassword && errors.oldPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              handleClickShowPassword("oldPassword");
                            }}
                            onMouseDown={() => {
                              handleClickShowPassword("oldPassword");
                            }}
                          >
                            {showOldPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="newPassword"
                    name="newPassword"
                    label="New Password"
                    fullWidth
                    type={showNewPassword ? "text" : "password"}
                    autoComplete="password"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.newPassword}
                    error={touched.newPassword && Boolean(errors.newPassword)}
                    helperText={touched.newPassword && errors.newPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              handleClickShowPassword("newPassword");
                            }}
                            onMouseDown={() => {
                              handleClickShowPassword("newPassword");
                            }}
                          >
                            {showNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    label="Confirm Password"
                    fullWidth
                    type={showConfirmNewPassword ? "text" : "password"}
                    autoComplete="password"
                    variant="outlined"
                    onChange={handleChange}
                    value={values.confirmNewPassword}
                    error={
                      touched.confirmNewPassword &&
                      Boolean(errors.confirmNewPassword)
                    }
                    helperText={
                      touched.confirmNewPassword && errors.confirmNewPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              handleClickShowPassword("confirmNewPassword");
                            }}
                            onMouseDown={() => {
                              handleClickShowPassword("confirmNewPassword");
                            }}
                          >
                            {showConfirmNewPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
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
