import { useState, useEffect } from "react";
import styles from "./login.module.css";
import { logInService } from "../../services/authService/authServices";
import { useAuthContext } from "../../context";
import { useNavigate, useLocation } from "react-router-dom";
const guestUserData = {
  email: "rittikdas@gmail.com",
  password: "adarshbalika",
};

export default function Login() {
  const { token, setToken, setUserData } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
    console.log(logInData);
  };
  const handleGuestSubmit = (e) => {
    e.preventDefault();

    setLogInData(guestUserData);
    logInService(guestUserData, setToken, setUserData);
  };
  useEffect(() => {
    if (token) {
      navigate(location.state?.from?.pathname || "/");
    }
  }, [token]);

  return (
    <div className={styles.authPage}>
      <div className={styles.authLogIn}>
        <h2>Log In</h2>

        <form className={styles.formPage}>
          <div className={styles.signInput}>
            <input
              type="text"
              placeholder="Enter Your Email"
              name="email"
              value={logInData.email}
              onChange={inputChangeHandler}
              required
            />
            <input
              type="text"
              placeholder="Enter Your Password"
              name="password"
              value={logInData.password}
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className={styles.signInBtn}>
            <button
              className={styles.signBtn}
              type="button"
              onClick={handleGuestSubmit}
            >
              Guest Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
