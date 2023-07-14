import { Link, useNavigate } from "react-router-dom";
import styles from "./cardComponent.module.css";
import {
  useAuthContext,
  useCartContext,
  useWishListContext,
} from "../../context";

import {
  isProductAlreadyInCart,
  isProductAlreadyInWishList,
} from "../../utils/getProductUtils";

export default function CardComponent({ product }) {
  // console.log(product);

  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { cartState, addToCart } = useCartContext();
  const { wishlistState, addToWishlist, removeFromWishlist } =
    useWishListContext();

  const { _id: productId, inStock } = product;
  const alreadyInWishList = isProductAlreadyInWishList(
    productId,
    wishlistState?.wishlist
  );
  const alreadyInCart = isProductAlreadyInCart(productId, cartState?.cart);

  const handleCart = () => {
    if (token) {
      if (alreadyInCart) {
        navigate("/cart");
      } else {
        addToCart(product, token);
      }
    } else {
      navigate("/login");
    }
  };

  const handleWishlist = () => {
    if (token) {
      if (alreadyInWishList) {
        removeFromWishlist(token, productId);
      } else {
        addToWishlist(token, product);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={
        product?.inStock
          ? `${styles.card}`
          : `${styles.disabledCard} ${styles.card} `
      }
    >
      {!inStock && <span className={styles.outOfStock}>Out of stock</span>}
      <div className={styles.cardContent}>
        <Link to={`/product/${product?._id}`}>
          <img
            src={product?.images}
            alt="card-img"
            className={styles.cardImage}
          />
        </Link>

        <h3 className={styles.cardTitle}>{product?.title}</h3>
        <p className={styles.cardPrice}>{"₹" + product?.price}</p>

        <div className={styles.cardFooter}>
          <button
            disabled={!inStock}
            className={
              !inStock
                ? `${styles.disabledBtn} ${styles.btnCard}`
                : alreadyInCart
                ? `${styles.btnCard}  ${styles.inCartBtn}`
                : `${styles.btnCard}`
            }
            onClick={handleCart}
          >
            {!inStock
              ? "Out Of Stock"
              : alreadyInCart
              ? "Go To Cart"
              : "Add To Cart"}
          </button>
          <button
            disabled={!inStock}
            className={
              !inStock
                ? `${styles.disabledBtn} ${styles.btnCard}`
                : alreadyInWishList
                ? `${styles.btnCard} ${styles.inWishlistBtn}`
                : `${styles.btnCard}`
            }
            onClick={handleWishlist}
          >
            {alreadyInWishList ? "Remove From Wishlist" : "Add To Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
