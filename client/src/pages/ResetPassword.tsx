import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { object, ref, string } from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { trpc } from "../utils/trpc";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const resetMutation = trpc.forgotPassword.resetPassword.useMutation();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const { isLoading, isError, error } =
    trpc.forgotPassword.checkResetToken.useQuery({
      resetToken: token ?? "",
    });

  const navigate = useNavigate();

  const resetPasswordSchema = object().shape({
    password: string().min(8).max(16).required(),
    confirm_password: string()
      .min(8)
      .max(16)
      .required()
      .oneOf([ref("password")], "confirm password and password must be same"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      resetMutation.mutate(
        { ...values, resetToken: token ?? "" },
        {
          onSuccess: (data) => {
            const { status, message } = data;
            if (status) {
              toast.success(message);
              navigate("/");
            } else {
              toast.error(message);
            }
          },
        }
      );
    },
  });
  return (
    <Paper sx={{ p: 4 }}>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ maxWidth: 400 }}
      >
        <Grid container justifyContent="center">
          <Stack sx={{ py: 2 }} justifyContent="center">
            <Avatar
              sx={{
                bgcolor: "secondary.main",
                alignSelf: "center",
                mb: 1,
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">Reset Password</Typography>
          </Stack>
        </Grid>
        {isLoading ? (
          <>
            <span> Checking Your Reset Request</span>
          </>
        ) : isError ? (
          <>
            <span>{error.message}</span>
            <Button component={Link} to="/" variant="contained">
              Login
            </Button>
          </>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirm_password"
                label="Confirm Password"
                name="confirm_password"
                autoComplete="password"
                autoFocus
                type={showConfirmPassword ? "text" : "password"}
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                error={
                  formik.touched.confirm_password &&
                  Boolean(formik.errors.confirm_password)
                }
                helperText={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {showConfirmPassword ? (
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
              <Grid container justifyContent="space-between">
                <Link to="/">Login?</Link>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </Paper>
  );
};
