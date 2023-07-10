import { useNavigate } from "react-router-dom";
import {
  useAuthContext,
  useCartContext,
  useFilterContext,
  useWishListContext,
} from "../../context";
import styles from "./profileCard.module.css";

export default function ProfileCard() {
  const { cartDispatch } = useCartContext();
  const { wishlistDispatch } = useWishListContext();
  const { filterProductDispatch } = useFilterContext();

  const { userData, setToken, setUserData } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    setToken(null);
    setUserData(null);
    cartDispatch({ type: "REMOVE_FROM_CART", payload: [] });
    wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: [] });
    filterProductDispatch({ type: "CLEAR_FILTERS", payload: [] });
    navigate("/");
  };

  return (
    <div className={styles.profileCard}>
      <h2>
        Name: <span className={styles.profileCardvalue}>{userData?.name}</span>{" "}
      </h2>
      <h3>
        Email:{" "}
        <span className={styles.profileCardvalue}> {userData?.email}</span>{" "}
      </h3>
      <button onClick={handleLogout} className={styles.logoutbtn}>
        LogOut
      </button>
    </div>
  );
}
