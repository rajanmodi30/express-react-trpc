import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { axios } from "../utils/axios";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Copyright } from "../components/Copyright";
import { ForgotPasswordForm } from "../utils/types";
export const ForgotPassword = () => {
  const forgotMutation = useMutation((data: ForgotPasswordForm) => {
    return axios.post("forgot-password", data);
  });

  const navigate = useNavigate();

  const forgotPasswordSchema = object().shape({
    email: string().email().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      forgotMutation.mutate(values, {
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
        Forgot Password
      </Typography>
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Reset Password Request
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/">Login In?</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
