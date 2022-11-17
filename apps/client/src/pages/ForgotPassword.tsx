import {
  Avatar,
  Button,
  Grid,
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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { trpc } from "../utils/trpc";
export const ForgotPassword = () => {
  const forgotMutation = trpc.forgotPassword.forgot.useMutation();

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
          const { status, message } = data;
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
            <Typography variant="h5">Forgot Password</Typography>
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
            <Grid container justifyContent="space-between">
              <Link to="/" color="primary">
                Login?
              </Link>
              <Button
                type="submit"
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Send Reset Link
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
