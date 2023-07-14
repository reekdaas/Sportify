import { createContext, useContext, useState } from "react";
import {
  logInService,
  signInService,
} from "../../services/authService/authServices";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AuthContext = createContext(null);
export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  // const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage?.getItem("userDetails"))
  );

  const userLogIn = async (userData) => {
    try {
      const response = await logInService(userData);
      const {
        data: { encodedToken, foundUser },
        status,
      } = response;

      if (status === 200) {
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("userDetails", JSON.stringify(foundUser));

        setToken(encodedToken);
        setUserData(foundUser);

        toast.success("Login Sucessfully");
        navigate(location.state?.from?.pathname || "/");
      }
    } catch (e) {
      toast.error("Something went wrong");
      // console.log(e);
    } finally {
    }
  };

  const userSignin = async (userData) => {
    try {
      const response = await signInService(userData);
      // console.log(response);
      const {
        data: { encodedToken, createdUser },
        status,
      } = response;

      if (status === 201) {
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("userDetails", JSON.stringify(createdUser));
        setToken(token);
        setUserData(createdUser);
        toast.success("Welcome User");
        navigate(location.state?.from?.pathname || "/");
      }
    } catch (err) {
      // console.log(err);
      toast.error("Something went wrong!");
    } finally {
    }
  };

  const value = {
    token,
    userData,
    userLogIn,
    userSignin,
    setToken,
    setUserData,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
