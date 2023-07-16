import { useState } from "react";
import styles from "./login.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

const guestUserData = {
  email: "rittikdas@gmail.com",
  password: "adarshbalika",
};

export default function Login() {
  const navigate = useNavigate();
  const { userLogIn } = useAuthContext();

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setLogInData({ ...logInData, [name]: value });
  };
  const handleGuestSubmit = (e) => {
    e.preventDefault();
    setLogInData(guestUserData);
    userLogIn(guestUserData);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    userLogIn(logInData);
  };

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
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className={styles.signBtn}
              type="button"
              onClick={handleGuestSubmit}
            >
              Guest Login
            </button>
          </div>
        </form>

        <p
          onClick={() => {
            navigate("/signin");
          }}
        >
          {" "}
          Create New Account <span>{<AiOutlineArrowRight />}</span>
        </p>
      </div>
    </div>
  );
}
