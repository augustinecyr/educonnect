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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import theme from "../themes/Theme";
import UserService from "../services/UserService"; // Import your UserService
import Visibility from "@mui/icons-material/Visibility"; // Import visibility icon
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Import visibility off icon
import { Select, MenuItem } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"; // Import necessary components for pop-up box

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

function RegisterUser() {
  const navigate = useNavigate();
  const [occupation, setOccupation] = useState("");
  const [customOccupation, setCustomOccupation] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State variable for password visibility
  const [open, setOpen] = useState(false); // State variable for controlling the visibility of the pop-up box
  const [success, setSuccess] = useState(false); // State variable for indicating whether registration was successful
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Form the data object based on the form
      const { name, company, occupation, mobile_number, email, password } =
        data;
      setSuccess(true);
      setOpen(true);
      // Call the register method of UserService
      await UserService.registerUser(
        name,
        company,
        occupation,
        mobile_number,
        email,
        password
      );
    } catch (error) {
      console.error(error.message);
      // Handle registration error (e.g., display error message)
      reset();
      setSuccess(false);
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the pop-up box
    if (success) {
      navigate("/login"); // If registration was successful, navigate to login page
    }
  };

  const handleOccupationChange = (event) => {
    const selectedOccupation = event.target.value;
    if (selectedOccupation === "others") {
      setOccupation("others");
    } else {
      setOccupation(selectedOccupation);
    }
  };

  const handleCustomOccupationChange = (event) => {
    setCustomOccupation(event.target.value);
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
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
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
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 3 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                {...register("name", { required: "Name is required" })}
              />
              <TextField
                margin="normal"
                fullWidth
                id="company"
                label="Company"
                name="company"
                {...register("company", {
                  required: "Company is required",
                })}
              />
              <Select
                fullWidth
                id="occupation"
                label="Occupation"
                name="occupation"
                {...register("occupation")}
                value={occupation}
                onChange={handleOccupationChange}
              >
                <MenuItem value="" disabled>
                  Select your occupation
                </MenuItem>
                <MenuItem value="Engineer">Engineer</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
              {occupation === "others" && (
                <TextField
                  id="custom-occupation"
                  label="Your Occupation"
                  fullWidth
                  value={customOccupation}
                  onChange={handleCustomOccupationChange}
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="mobile_number"
                label="Mobile Number"
                name="mobile_number"
                type="tel"
                autoComplete="tel"
                inputProps={{ pattern: "[0-9]{10}", maxLength: 10 }}
                error={!!errors.mobile_number}
                helperText={
                  errors.mobile_number
                    ? "Mobile Number must be 10 digits long"
                    : ""
                }
                {...register("mobile_number", {
                  required: "Mobile Number is required",
                  pattern: {
                    value: "[0-9]{10}",
                    message: "Invalid Mobile Number",
                  },
                })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIphoneIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear mobile number"
                        onClick={() => setValue("mobile_number", "")} // assuming you're using setValue from react-hook-form
                        edge="end"
                      >
                        <ClearIcon color="action" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
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
                autoComplete="new-password"
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
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
                Registration Successful!
              </Typography>
            ) : (
              <Typography variant="h6" color="error">
                Registration Failed
              </Typography>
            )}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {success
                ? "Congratulations! Your registration was successful. You can now log in to your account."
                : "Oops! It seems there was an error during the registration process. Please try again later."}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </ThemeProvider>
  );
}

export default RegisterUser;
