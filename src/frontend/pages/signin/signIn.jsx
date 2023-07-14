import { useState } from "react";
import styles from "./signin.module.css";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const { userSignin } = useAuthContext();

  const [userDetails, setuserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userDetails.password !== userDetails.confirmPassword) {
      toast.error("Password must be same");
    }
    // console.log(userDetails);
    userSignin(userDetails);
  };

  return (
    <div className={styles.signinPage}>
      <div className={styles.signinContainer}>
        <h2 className={styles.heading}>Sign In</h2>
        <form className={styles.signinForm} onSubmit={handleSubmit}>
          <div className={styles.signinFormRow}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.signinFormRow}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.signinFormRow}>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.signinFormRow}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className={styles.signInBtn}>
            {" "}
            Sign In{" "}
          </button>
        </form>
        <p
          onClick={() => {
            navigate("/login");
          }}
        >
          Alreday have an account?
        </p>
      </div>
    </div>
  );
}
