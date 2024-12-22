import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoading = !user && !!token; // Add a loading condition

  useEffect(() => {
    if (!token) {
      // Redirect to login if not authenticated
      if (
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/"
      ) {
        navigate({ to: "/" });
      }
    } else if (
      !isLoading &&
      allowedRoles &&
      !allowedRoles.includes(user?.role)
    ) {
      // Redirect to home or a 403 page if user role is not allowed
      navigate({ to: "/" });
    }
  }, [
    token,
    user?.role,
    allowedRoles,
    navigate,
    location.pathname,
    isLoading,
  ]);

  // Prevent rendering if redirecting or loading
  if (!token || isLoading) {
    if (
      location.pathname !== "/login" &&
      location.pathname !== "/register" &&
      location.pathname !== "/"
    ) {
      return null; // Render nothing during redirect or loading
    }
  }

  return children; // Render children only if all checks pass
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
