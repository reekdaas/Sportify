import styles from "./LinksContainer.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import {
  useAuthContext,
  useCartContext,
  useWishListContext,
} from "../../context";

export default function LinksContainer() {
  const { token } = useAuthContext();
  const {
    cartState: { cart },
  } = useCartContext();

  const {
    wishlistState: { wishlist },
  } = useWishListContext();

  const {} = useWishListContext();
  const navigate = useNavigate();
  // console.log(cart.length);

  return (
    <div className={styles.linkContainer}>
      <button
        className={styles.exploreBtn}
        onClick={() => {
          navigate("/products");
        }}
      >
        Explore
      </button>
      <NavLink className={styles.exploreLink} to="wishlist">
        <AiOutlineHeart />
        {wishlist.length > 0 && (
          <span className={styles.itemCount}>{wishlist.length}</span>
        )}
      </NavLink>
      <NavLink className={styles.exploreLink} to="cart">
        <AiOutlineShoppingCart />
        {cart.length > 0 && (
          <span className={styles.itemCount}>{cart.length}</span>
        )}
      </NavLink>
      {token ? (
        <NavLink
          to="profile"
          className={styles.exploreLink}
          onClick={() => {
            navigate("profile");
          }}
        >
          <AiOutlineUser />
        </NavLink>
      ) : (
        <NavLink className={styles.exploreBtn} to="login">
          LogIn
        </NavLink>
      )}
    </div>
  );
}
