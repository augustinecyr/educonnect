import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Footer from "../components/Footer";
import theme from "../themes/Theme";
import authServiceInstance from "../services/AuthService";
import profileSvcInstance from "../services/ProfileService";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

export default function Profile() {
  const isAdmin = authServiceInstance.isAdmin("admin@educonnect.sg");
  const isAuthenticated = authServiceInstance.isAuthenticated();
  console.log("User has a valid token:", isAuthenticated);
  console.log("User is an Admin", isAdmin);
  const email = localStorage.getItem("email");
  const [profileInfo, setProfileInfo] = useState(null);
  const [isEditing, setIsEditing] = useState({
    name: false,
    company: false,
    occupation: false,
    mobile_number: false,
    email: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [fieldValidity, setFieldValidity] = useState({
    name: true,
    company: true,
    occupation: true,
    mobile_number: true,
    email: true,
  });
  const [formChanged, setFormChanged] = useState(false);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    async function fetchProfileInfo() {
      try {
        const response = await profileSvcInstance.fetchProfile(email);
        setProfileInfo(response);
      } catch (error) {
        console.error("Error fetching profile information:", error);
      }
    }

    fetchProfileInfo();
  }, [email]);

  const renderEditIcon = (field) => {
    return (
      <IconButton onClick={() => handleEdit(field)}>
        <EditIcon color="primary" />
      </IconButton>
    );
  };
  

  const handleEdit = (field) => {
    setIsEditing((prevIsEditing) => ({
      ...prevIsEditing,
      [field]: true,
    }));
  };

  const handleUpdate = async () => {
    try {
      await profileSvcInstance.editProfile(email, profileInfo);
      openSnackbar("Profile updated successfully", "success");
    } catch (error) {
      console.error("Error updating profile:", error);
      openSnackbar("Failed to update profile", "error");
    }
  };

  const handleChange = (field, value) => {
    setProfileInfo((prevProfileInfo) => ({
      ...prevProfileInfo,
      [field]: value,
    }));
    setFormChanged(true);
  };

  const handleFieldValidation = (field, value) => {
    const isValid = value.trim() !== "";
    setFieldValidity((prevValidity) => ({
      ...prevValidity,
      [field]: isValid,
    }));
  };

  const isFormValid = () => {
    return Object.values(fieldValidity).every((valid) => valid);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <br />
        <main style={{ textAlign: "center" }}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} md={8}>
              {profileInfo && (
                <div>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <TextField
                        value={profileInfo.name}
                        onChange={(e) => {
                          handleChange("name", e.target.value);
                          handleFieldValidation("name", e.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing.name}
                        error={!fieldValidity.name}
                      />
                      {renderEditIcon("name")}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <BusinessIcon />
                      </ListItemIcon>
                      <TextField
                        value={profileInfo.company}
                        onChange={(e) => {
                          handleChange("company", e.target.value);
                          handleFieldValidation("company", e.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing.company}
                        error={!fieldValidity.company}
                      />
                      {renderEditIcon("company")}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <TextField
                        value={profileInfo.occupation}
                        onChange={(e) => {
                          handleChange("occupation", e.target.value);
                          handleFieldValidation("occupation", e.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing.occupation}
                        error={!fieldValidity.occupation}
                      />
                      {renderEditIcon("occupation")}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <TextField
                        value={profileInfo.mobile_number}
                        onChange={(e) => {
                          handleChange("mobile_number", e.target.value);
                          handleFieldValidation(
                            "mobile_number",
                            e.target.value
                          );
                        }}
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing.mobile_number}
                        error={!fieldValidity.mobile_number}
                      />
                      {renderEditIcon("mobile_number")}
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <TextField
                        value={profileInfo.email}
                        onChange={(e) => {
                          handleChange("email", e.target.value);
                          handleFieldValidation("email", e.target.value);
                        }}
                        fullWidth
                        variant="outlined"
                        disabled={!isEditing.email}
                        error={!fieldValidity.email}
                      />
                      {renderEditIcon("email")}
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    disabled={
                      !formChanged ||
                      !isFormValid() ||
                      !Object.values(isEditing).some((editing) => editing)
                    }
                  >
                    Update
                  </Button>{" "}
                </div>
              )}
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <SnackbarContent
              onClose={handleSnackbarClose}
              message={snackbarMessage}
              sx={{
                backgroundColor:
                  snackbarSeverity === "success"
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
            />
          </Snackbar>
        </main>
      </Container>
      <br />
      <br />
      <Footer />
    </ThemeProvider>
  );
}
