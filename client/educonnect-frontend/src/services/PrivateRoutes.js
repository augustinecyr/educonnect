import { Outlet } from "react-router-dom";
import { Alert } from "@mui/material";
import authServiceInstance from "../services/AuthService";

const PrivateRoutes = () => {
  const isAuthenticated = authServiceInstance.isAuthenticated();
  const isAdmin = authServiceInstance.isAdmin();
  const isAuthorized = isAuthenticated && isAdmin;

  if (!isAuthorized) {
    return (
      <Alert severity="error" variant="outlined">
        Access Denied
      </Alert>
    );
  }
  return <Outlet />;
};

export default PrivateRoutes;
