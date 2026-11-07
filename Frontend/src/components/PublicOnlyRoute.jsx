import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicOnlyRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return (
      <Navigate
        to={location.state?.from || "/dashboard"}
        replace
      />
    );
  }

  return children;
}
