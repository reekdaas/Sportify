import React, { useEffect, useState } from "react";
import styles from "./cartCard.module.css";

import {
  useAuthContext,
  useCartContext,
  useWishListContext,
} from "../../context";
import {
  getCartServices,
  removeItemFromCartServices,
  updateCartQuantityServices,
} from "../../services/cartService/cartServices";
import { isProductAlreadyInWishList } from "../../utils/getProductUtils";
import { addToWishlistService } from "../../services/wishlistService/wishListService";

export default function CartCard({ product }) {
  const [btnDisable, setBtnDisable] = useState(false);
  const { token } = useAuthContext();
  const { cartDispatch } = useCartContext();
  const { _id, images, title, price, qty } = product;
  const { wishlistState, wishlistDispatch } = useWishListContext();

  const cartQuantityHandler = (type) => {
    console.log(type);
    updateCartQuantityServices(_id, token, type, cartDispatch);
  };
  const handleRemoveFromCart = () => {
    removeItemFromCartServices(_id, token, cartDispatch);
  };

  const isInWishList = isProductAlreadyInWishList(_id, wishlistState?.wishlist);

  const handleMovetoWishlis = () => {
    if (isInWishList) {
      setBtnDisable(true);
    } else {
      addToWishlistService(token, product, wishlistDispatch);
    }
  };

  useEffect(() => {
    if (token) {
      getCartServices(token, cartDispatch);
    }
  }, [token]);

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
            className={styles.cartItemQuantityBtn}
            onClick={() => {
              cartQuantityHandler("increment");
            }}
          >
            -
          </button>
          <span className={styles.cartItemQuantityValue}>{qty}</span>
          <button
            className={styles.cartItemQuantityBtn}
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
                ? ` ${styles.disabledBtn} ${styles.cartBtn} `
                : styles.cartBtn
            }
            onClick={handleMovetoWishlis}
          >
            {isInWishList ? "Already In Wishlist" : "Move To Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
