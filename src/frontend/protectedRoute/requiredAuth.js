import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context";

export default function RequiredAuth({ children }) {
  const { token } = useAuthContext();
  // console.log(token);
  const location = useLocation();
  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}
