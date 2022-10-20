import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { object, ref, string } from "yup";
import { axios } from "../utils/axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DefaultApiResponse, ResetPasswordForm } from "../utils/types";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ENDPOINTS } from "../utils/apis";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.getAll("token");

  const resetMutation = useMutation((data: ResetPasswordForm) => {
    return axios.post(ENDPOINTS.RESET_PASSWORD(token), data);
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const checkToken = (): Promise<DefaultApiResponse> =>
    axios
      .get(ENDPOINTS.RESET_PASSWORD_TOKEN(token))
      .then((response) => response.data);

  const { isLoading, data, isSuccess } = useQuery(["checkToken"], checkToken);

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
      resetMutation.mutate(values, {
        onSuccess: (data) => {
          const { status, message } = data.data;
          if (status) {
            toast.success(message);
            navigate("/");
          } else {
            toast.error(message);
          }
        },
      });
    },
  });
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      {isLoading ? (
        <>
          <span> Checking Your Reset Request</span>
        </>
      ) : isSuccess && !data.status ? (
        <>
          <span>{data.message}</span>
          <Button component={Link} to="/" variant="contained">
            Login
          </Button>
        </>
      ) : (
        <>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
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
            />{" "}
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
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
