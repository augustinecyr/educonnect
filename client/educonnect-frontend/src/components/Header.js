import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import logo from "../images/educonnect.jpg";
import "../index.css";
import authServiceInstance from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const { sections, title } = props;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    try {
      // Call the logout method of AuthService
      await authServiceInstance.logout();
      // Redirect to login page or any other desired location
      navigate("/login");
    } catch (error) {
      console.error("Logout has failed:", error.message);
      // Handle logout error (e.g., display error message)
    }
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: "space-between",
          overflowX: "auto",
          "& .section-link": {
            textDecoration: "none",
            color: "inherit",
            transition: "color 0.3s ease",
            "&:hover": {
              color: "#007bff",
            },
          },
        }}
      >
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
                sx={{
                  p: 1,
                  flexShrink: 0,
                  transition: "transform 0.3s ease",
                }}
              >
                {section.title}
              </Link>
            )}
          </React.Fragment>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

export default Header;
