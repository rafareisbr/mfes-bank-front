import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "contexts/AuthProvider";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" redirect state={{ from: location }} />;
  }

  return children;
}
