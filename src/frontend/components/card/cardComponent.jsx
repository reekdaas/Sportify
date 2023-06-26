import { Link, useNavigate } from "react-router-dom";
import styles from "./cardComponent.module.css";
import {
  useAuthContext,
  useCartContext,
  useWishListContext,
} from "../../context";
import { addToCartService } from "../../services/cartService/cartServices";
import {
  addToWishlistService,
  removeFromWishlistService,
} from "../../services/wishlistService/wishListService";
import {
  isProductAlreadyInCart,
  isProductAlreadyInWishList,
} from "../../utils/getProductUtils";
import { useState } from "react";

export default function CardComponent({ product }) {
  // console.log(product);
  const [btnDisable, setBtnDisable] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { cartState, cartDispatch } = useCartContext();
  const { wishlistState, wishlistDispatch } = useWishListContext();

  const { _id: productId, inStock } = product;
  const alreadyInWishList = isProductAlreadyInWishList(
    productId,
    wishlistState?.wishlist
  );
  const alreadyInCart = isProductAlreadyInCart(productId, cartState?.cart);

  // console.log(alreadyInWishList);

  const handleCart = () => {
    if (token) {
      if (alreadyInCart) {
        navigate("/cart");
      } else {
        addToCartService(product, token, cartDispatch, setBtnDisable);
      }
    } else {
      navigate("/login");
    }
  };

  const handleWishlist = () => {
    if (token) {
      if (alreadyInWishList) {
        removeFromWishlistService(token, productId, wishlistDispatch);
      } else {
        addToWishlistService(token, product, wishlistDispatch);
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

        <h1 className={styles.cardTitle}>{product?.title}</h1>
        <div className={styles.cardBody}>
          <p className={styles.cardPrice}>{"₹" + product?.price}</p>
        </div>
        <div className={styles.cardFooter}>
          <button
            disabled={!inStock}
            className={` ${styles.btnCard} ${
              btnDisable || !inStock ? "disabled-btn" : ""
            } 
             ${alreadyInCart && "inCartBtn"} `}
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
                ? `disabled-btn ${styles.btnCard}`
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
