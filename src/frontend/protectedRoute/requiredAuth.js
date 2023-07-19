import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context";

export default function RequiredAuth({ children }) {
  const { token } = useAuthContext();

  //! If user is already logged in i.e token is present then the children component get rendered, otherwise it redirects the user to login page with the help of Navigate component

  const location = useLocation();
  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}
