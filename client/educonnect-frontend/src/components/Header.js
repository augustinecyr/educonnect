import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import logo from "../images/educonnect.jpg";
import '../index.css';
import authServiceInstance from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const { sections, title } = props;
  const navigate = useNavigate();

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
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          <Link href="http://localhost:3000/home" className="logo-link">
            <img
              src={logo}
              alt="EduConnect Logo"
              style={{ width: "50px", height: "auto" }}
            />
          </Link>
          {title}
        </Typography>
        <Button variant="outlined" size="small" onClick={onLogout}>
          Log Out
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
