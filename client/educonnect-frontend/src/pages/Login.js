import React, { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import theme from "../themes/Theme";
import authServiceInstance from "../services/AuthService"; // Import your AuthService
import Visibility from "@mui/icons-material/Visibility"; // Import visibility icon
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Import visibility off icon
import { Dialog, DialogTitle, DialogContent } from "@mui/material"; // Import necessary components for pop-up box
import loginpage from "../images/login-page.jpg";
import PersonIcon from "@mui/icons-material/Person";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://localhost:3000/">
        EduConnect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility
  const [open, setOpen] = useState(false); // State variable for controlling the visibility of the pop-up box
  const [success, setSuccess] = useState(false); // State variable for indicating whether registration was successful

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      // Call the login method of AuthService
      await authServiceInstance.login(email, password);
      setSuccess(true);
      setOpen(true);
      await new Promise((resolve) => setTimeout(resolve, 2500));
      // If login successful, redirect to home page
      navigate("/home");
    } catch (error) {
      console.error("Login has failed:", error.message);
      setOpen(true);
      setSuccess(false);
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the pop-up box
    if (success) {
      navigate("/home"); // If registration was successful, navigate to login page
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Toggle password visibility
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
              <PersonIcon />
            </Avatar>
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
                inputProps={{
                  pattern: "^[a-zA-Z1-9_]+( [a-zA-Z0-9_]+)*$",
                }}
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                id="password"
                autoComplete="current-password"
                inputProps={{
                  minLength: 6,
                }}
                error={!!errors.password}
                helperText={
                  errors.password
                    ? "Password must be at least 6 characters long"
                    : ""
                }
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                InputProps={{
                  // Show/hide password icon
                  endAdornment: (
                    <FormControlLabel
                      control={
                        <Checkbox
                          icon={<VisibilityOff />}
                          checkedIcon={<Visibility />}
                          onClick={togglePasswordVisibility}
                          edge="end"
                        />
                      }
                    />
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/resetpassword" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {success ? (
              <Typography variant="h6" color="primary">
                Successful Login
              </Typography>
            ) : (
              <Typography variant="h6" color="error">
                Error
              </Typography>
            )}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {success
                ? "Welcome! You are now logged in."
                : "Oops! It seems there was an error during the login process. Please try again later."}
            </Typography>
          </DialogContent>
        </Dialog>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
