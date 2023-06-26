import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage?.getItem("token"));
  const [userData, setUserData] = useState(
    JSON.parse(localStorage?.getItem("userDetails"))
  );
  // console.log(token);
  // console.log(userData);
  const value = { token, userData, setToken, setUserData };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
