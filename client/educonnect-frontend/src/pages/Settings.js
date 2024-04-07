import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from "../themes/Theme";
import authServiceInstance from "../services/AuthService";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import profileSvcInstance from "../services/ProfileService";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Profile from "./Profile";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const sections = [
  { title: "Courses", url: "/courses" },
  { title: "Analytics", url: "/analytics" },
  { title: "Profile", url: "#" },
];

export default function Settings() {
  const isAdmin = authServiceInstance.isAdmin("admin@educonnect.sg");
  const isAuthenticated = authServiceInstance.isAuthenticated();
  const email = localStorage.getItem("email");
  const [profileInfo, setProfileInfo] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [currentTab, setCurrentTab] = useState(0);
  const [languagePreference, setLanguagePreference] = useState("english");
  const [timezone, setTimezone] = useState("asia/singapore");
  const [enableNotifications, setEnableNotifications] = useState(false);
  const [receiveNewsletter, setReceiveNewsletter] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("");

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
    const storedLanguagePreference = localStorage.getItem("languagePreference");
    const storedTimezone = localStorage.getItem("timezone");
    const storedEnableNotifications =
      localStorage.getItem("enableNotifications") === "true";
    const storedReceiveNewsletter =
      localStorage.getItem("receiveNewsletter") === "true";
    const storedProfileVisibility = localStorage.getItem("profileVisibility");

    setLanguagePreference(storedLanguagePreference || "english");
    setTimezone(storedTimezone || "asia/singapore");
    setEnableNotifications(storedEnableNotifications);
    setReceiveNewsletter(storedReceiveNewsletter);
    setProfileVisibility(storedProfileVisibility || "");
  }, []);

  useEffect(() => {
    localStorage.setItem("languagePreference", languagePreference);
    localStorage.setItem("timezone", timezone);
    localStorage.setItem("enableNotifications", enableNotifications);
    localStorage.setItem("receiveNewsletter", receiveNewsletter);
    localStorage.setItem("profileVisibility", profileVisibility);
  }, [
    languagePreference,
    timezone,
    enableNotifications,
    receiveNewsletter,
    profileVisibility,
  ]);

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

  const handleSavePrivacySettings = () => {
    openSnackbar("Privacy settings saved", "success");
  };

  const handleSavePreferences = () => {
    openSnackbar("Preferences saved", "success");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={""} sections={sections} />
      <Container maxWidth="lg">
        <br />
        <main>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12}>
              <Tabs
                value={currentTab}
                onChange={(event, newValue) => setCurrentTab(newValue)}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Personal Information" />
                <Tab label="Account Settings" />
                <Tab label="Privacy Settings" />
                <Tab label="Preferences" />
              </Tabs>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  {currentTab === 0 && <Profile />}
                  {currentTab === 1 && (
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Account Settings
                      </Typography>
                      <FormControl component="fieldset" sx={{ mb: 2 }}>
                        <FormGroup sx={{ mb: 2 }}>
                          <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            label="Change Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <Button variant="contained" color="primary">
                            Save Changes
                          </Button>
                        </FormGroup>
                      </FormControl>
                    </div>
                  )}
                  {currentTab === 2 && (
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Privacy Settings
                      </Typography>
                      <FormControl
                        component="fieldset"
                        sx={{ mb: 2, width: "100%" }}
                      >
                        <FormGroup>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, width: "100%" }}
                          >
                            <InputLabel>Profile Visibility</InputLabel>
                            <Select
                              label="Profile Visibility"
                              fullWidth
                              value={profileVisibility}
                              onChange={(e) =>
                                setProfileVisibility(e.target.value)
                              }
                            >
                              <MenuItem value="private">Private</MenuItem>
                              <MenuItem value="public">Public</MenuItem>
                            </Select>
                          </FormControl>
                        </FormGroup>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSavePrivacySettings}
                          sx={{ width: 100 }}
                        >
                          Save
                        </Button>
                      </FormControl>
                    </div>
                  )}

                  {currentTab === 3 && (
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Preferences
                      </Typography>
                      <FormControl
                        component="fieldset"
                        sx={{ mb: 2, width: "100%" }}
                      >
                        <FormGroup>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2, width: "100%" }}
                          >
                            <InputLabel>Language Preference</InputLabel>
                            <Select
                              label="Language Preference"
                              fullWidth
                              MenuProps={{
                                PaperProps: { style: { maxHeight: 300 } },
                              }}
                              value={languagePreference}
                              onChange={(e) =>
                                setLanguagePreference(e.target.value)
                              }
                            >
                              <MenuItem value="english">English</MenuItem>
                              <MenuItem value="spanish">Español</MenuItem>
                              <MenuItem value="french">Français</MenuItem>
                              <MenuItem value="chinese">中文</MenuItem>
                              <MenuItem value="thai">ไทย</MenuItem>
                              <MenuItem value="japanese">日本語</MenuItem>
                              <MenuItem value="portuguese">Português</MenuItem>
                            </Select>
                          </FormControl>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                          >
                            <InputLabel>Timezone</InputLabel>
                            <Select
                              label="Timezone"
                              fullWidth
                              MenuProps={{
                                PaperProps: { style: { maxHeight: 300 } },
                              }}
                              value={timezone}
                              onChange={(e) => setTimezone(e.target.value)}
                            >
                              <MenuItem value="gmt">
                                London (GMT - Greenwich Mean Time)
                              </MenuItem>
                              <MenuItem value="cest">
                                Paris (CEST - Central European Summer Time)
                              </MenuItem>
                              <MenuItem value="cest">
                                Berlin (CEST - Central European Summer Time)
                              </MenuItem>
                              <MenuItem value="cest">
                                Rome (CEST - Central European Summer Time)
                              </MenuItem>
                              <MenuItem value="cest">
                                Madrid (CEST - Central European Summer Time)
                              </MenuItem>
                              <MenuItem value="eet">
                                Cairo (EET - Eastern European Time)
                              </MenuItem>
                              <MenuItem value="eest">
                                Athens (EEST - Eastern European Summer Time)
                              </MenuItem>
                              <MenuItem value="eest">
                                Istanbul (EEST - Eastern European Summer Time)
                              </MenuItem>
                              <MenuItem value="eest">
                                Helsinki (EEST - Eastern European Summer Time)
                              </MenuItem>
                              <MenuItem value="msk">
                                Moscow (MSK - Moscow Standard Time)
                              </MenuItem>
                              <MenuItem value="asia/dubai">
                                Dubai (GST - Gulf Standard Time)
                              </MenuItem>
                              <MenuItem value="asia/kolkata">
                                Mumbai (IST - Indian Standard Time)
                              </MenuItem>
                              <MenuItem value="asia/singapore">
                                Singapore (SGT - Singapore Time)
                              </MenuItem>
                              <MenuItem value="asia/hong_kong">
                                Hong Kong (HKT - Hong Kong Time)
                              </MenuItem>
                              <MenuItem value="asia/tokyo">
                                Tokyo (JST - Japan Standard Time)
                              </MenuItem>
                              <MenuItem value="australia/sydney">
                                Sydney (AEST - Australian Eastern Standard Time)
                              </MenuItem>
                              <MenuItem value="australia/melbourne">
                                Melbourne (AEST - Australian Eastern Standard
                                Time)
                              </MenuItem>
                              <MenuItem value="australia/brisbane">
                                Brisbane (AEST - Australian Eastern Standard
                                Time)
                              </MenuItem>
                              <MenuItem value="pacific/auckland">
                                Auckland (NZST - New Zealand Standard Time)
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Enable Notifications"
                            sx={{ mb: 2 }}
                            checked={enableNotifications}
                            onChange={(e) =>
                              setEnableNotifications(e.target.checked)
                            }
                          />
                          <FormControlLabel
                            control={<Checkbox />}
                            label="Receive Newsletter"
                            sx={{ mb: 2 }}
                            checked={receiveNewsletter}
                            onChange={(e) =>
                              setReceiveNewsletter(e.target.checked)
                            }
                          />
                        </FormGroup>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSavePreferences}
                          sx={{ width: 100 }}
                        >
                          Save
                        </Button>
                      </FormControl>
                    </div>
                  )}
                </CardContent>
              </Card>
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
