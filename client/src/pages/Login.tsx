import {
  Avatar,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth";
import { DEVICE_TYPE } from "../utils";
import { axios } from "../utils/axios";
import storage from "../utils/storage";
import { LoginForm } from "../utils/types";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const { isSuccess, isLoading, data, mutate } = useMutation(
    (data: LoginForm) => {
      return axios.post("login", data);
    }
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      deviceType: DEVICE_TYPE,
    },
    onSubmit: async (values) => {
      event?.preventDefault();
      console.log("submit values");
      mutate(values);
    },
  });

  if (isSuccess) {
    const response = data.data;
    const { status, message, accessToken } = response;
    const user = response.data;
    console.log(status, message, accessToken, user);
    if (!status) {
      toast.error(message);
    } else {
      console.log("success");
      toast.success(message);
      storage.setUser(user);
      storage.setToken(accessToken);
      setUser(user);
      setToken(accessToken);
      navigate("/admin");
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              disabled={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" relative="path">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" relative="path">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  );
};
