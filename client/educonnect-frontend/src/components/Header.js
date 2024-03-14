import React, { useState } from "react";
import {
  Toolbar,
  Typography,
  Link,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../images/educonnect.jpg";
import "../index.css";
import authServiceInstance from "../services/AuthService";

function Header({ sections, title }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    try {
      authServiceInstance.logout();
      navigate("/login");
    } catch (error) {
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
                  <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
                  <MenuItem onClick={handleMenuClose}>My Courses</MenuItem>
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
                sx={{ p: 1, flexShrink: 0 ,textDecoration: "none"}}
              >
                {section.title}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </Toolbar>
  );
}

export default Header;
