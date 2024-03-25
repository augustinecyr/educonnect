import React, { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import theme from "../themes/Theme";
import loginpage from "../images/login-page.jpg";
import EmailIcon from "@mui/icons-material/Email";

function ResetPassword() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setOpenSnackbar(true);
      setSuccessMessage("Email sent successfully!");
      setTimeout(() => {
        setOpenSnackbar(false);
        navigate("/login");
      }, 3000); // Navigate to login after 3 seconds
    } catch (error) {
      console.error("Forgot password request failed:", error.message);
      setErrorMessage("Failed to send email. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${loginpage})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#9c27b0" }}>
              <EmailIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
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
                type="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: "^[a-zA-Z1-9_]+( [a-zA-Z0-9_]+)*$",
                    message: "Invalid email address",
                  },
                })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Back to Login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={successMessage || errorMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Snackbar appears at the top right corner
        ContentProps={{
          sx: {
            backgroundColor: successMessage ? "#4caf50" : "#f44336", // Change background color based on success or error message
          },
        }}
      />
    </ThemeProvider>
  );
}

export default ResetPassword;
