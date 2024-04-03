import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Link,
  Button,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../images/educonnect.jpg";
import "../index.css";
import authServiceInstance from "../services/AuthService";

function Header({ sections, title }) {
  const navigate = useNavigate();
  const isAdmin = authServiceInstance.isAdmin("admin@educonnect.sg");
  const [anchorEl, setAnchorEl] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const email = localStorage.getItem("email");

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    try {
      authServiceInstance.logout();
      setSuccessMessage("Logout successfully!");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/login");
    } catch (error) {
      setErrorMessage("Failed to logout!");
      console.error("Logout has failed:", error.message);
    }
  };

  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Link href="http://localhost:3000/home" className="logo-link">
        <img
          src={logo}
          alt="EduConnect Logo"
          style={{ width: "50px", height: "auto" }}
        />
      </Link>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        {title}
      </Typography>
      <div>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {section.title === "Profile" ? (
              <>
                <Button
                  aria-controls="profile-menu"
                  aria-haspopup="true"
                  onClick={handleProfileClick}
                >
                  {section.title}
                </Button>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleMenuClose();
                    }}
                  >
                    My Account
                  </MenuItem>
                  {isAdmin ? null : (
                    <MenuItem
                      onClick={() => {
                        if (email) {
                          navigate(`/courses/${email}`);
                        } else {
                          console.error("Email not available");
                        }
                        handleMenuClose();
                      }}
                    >
                      My Courses
                    </MenuItem>
                  )}
                  <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link
                color="inherit"
                noWrap
                variant="body2"
                href={section.url}
                className="section-link"
                sx={{ p: 1, flexShrink: 0, textDecoration: "none" }}
              >
                {section.title}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
      <Snackbar
        open={!!successMessage || !!errorMessage}
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
    </Toolbar>
  );
}

export default Header;
