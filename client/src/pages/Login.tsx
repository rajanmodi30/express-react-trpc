import {
  Avatar,
  Button,
  Container,
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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { useAuthStore } from "../store/auth";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import { DEVICES } from "../utils/types";

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const loginMutation = trpc.auth.login.useMutation();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const LoginSchema = object().shape({
    email: string().email().required(),
    password: string().required(),
    deviceType: string().required(),
  });

  const formik = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: "",
      password: "",
      deviceType: DEVICES.WEB,
    },
    onSubmit: async (values) => {
      event?.preventDefault();
      loginMutation.mutate(
        {
          ...values,
          fcmToken: undefined,
        },
        {
          onSuccess: (data) => {
            const { status, message, accessToken } = data;
            const user = data.data;
            if (!status) {
              toast.error(message);
            } else {
              toast.success(message);
              if (
                !Array.isArray(user) &&
                user !== undefined &&
                accessToken !== undefined
              ) {
                user;

                setUser(user);
                setToken(accessToken);
                navigate("/admin");
              } else {
                toast.error("OOPS something went wrong");
              }
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
            <Typography variant="h5">Login</Typography>
          </Stack>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              aria-errormessage=""
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
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
            <Grid container justifyContent="space-between">
              <Link to="/forgot-password">Forgot password?</Link>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
