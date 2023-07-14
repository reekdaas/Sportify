import styles from "./cartCard.module.css";
import {
  useAuthContext,
  useCartContext,
  useWishListContext,
} from "../../context";
import { isProductAlreadyInWishList } from "../../utils/getProductUtils";

import { toast } from "react-hot-toast";

export default function CartCard({ product }) {
  const { disabledBtn } = useCartContext();
  const { token } = useAuthContext();
  const { updateQuantityInCart, removeFromCart } = useCartContext();
  const { _id, images, title, price, qty } = product;
  const { wishlistState, addToWishlist } = useWishListContext();

  const cartQuantityHandler = (type) => {
    updateQuantityInCart(_id, token, type);
  };
  const handleRemoveFromCart = () => {
    removeFromCart(_id, token);
    toast.success("Removed from cart");
  };

  const isInWishList = isProductAlreadyInWishList(_id, wishlistState?.wishlist);

  const handleMovetoWishlis = () => {
    addToWishlist(token, product);
  };

  return (
    <div className={styles.ItemCard}>
      <div className={styles.cardImage}>
        <img src={images} alt={title} />
      </div>
      <div className={styles.cardDetails}>
        <h3>{title}</h3>
        <h3>Price: ₹{price}</h3>
        <div className={styles.cartItemQuantity}>
          <button
            disabled={disabledBtn || qty === 1}
            className={
              disabledBtn || qty === 1
                ? `${styles.cartItemQuantityBtn} ${styles.disabledBtn} `
                : `${styles.cartItemQuantityBtn}`
            }
            onClick={() => {
              if (qty === 1) removeFromCart(_id, token);
              else cartQuantityHandler("decrement");
            }}
          >
            -
          </button>
          <span className={styles.cartItemQuantityValue}>{qty}</span>
          <button
            disabled={disabledBtn}
            className={
              disabledBtn
                ? `${styles.cartItemQuantityBtn} ${styles.disabledBtn} `
                : `${styles.cartItemQuantityBtn}`
            }
            onClick={() => {
              cartQuantityHandler("increment");
            }}
          >
            +
          </button>
        </div>
        <div className={styles.cartButtons}>
          <button className={styles.cartBtn} onClick={handleRemoveFromCart}>
            Remove from Cart
          </button>
          <button
            className={
              isInWishList
                ? ` ${styles.disabledBtn} ${styles.cartBtn} ${styles.isInWishList} `
                : styles.cartBtn
            }
            disabled={isInWishList}
            onClick={handleMovetoWishlis}
          >
            {isInWishList ? "Already In Wishlist" : "Move To Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
