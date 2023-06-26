import { useNavigate, useParams } from "react-router-dom";
import {
  useAuthContext,
  useCartContext,
  useProductContext,
  useWishListContext,
} from "../../context";
import Loading from "../loading/loading";
import styles from "./productElement.module.css";
import Stars from "./Stars/Stars";
import { addToCartService } from "../../services/cartService/cartServices";
import {
  isProductAlreadyInCart,
  isProductAlreadyInWishList,
} from "../../utils/getProductUtils";
import {
  addToWishlistService,
  removeFromWishlistService,
} from "../../services/wishlistService/wishListService";
import { useState } from "react";

export default function ProductElement() {
  const { productState, productDispatch } = useProductContext();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { cartState, cartDispatch } = useCartContext();
  const { wishlistState, wishlistDispatch } = useWishListContext();
  const { productId } = useParams();
  const searchedProduct = productState?.productList?.find(
    ({ _id }) => _id === productId
  );
  if (!searchedProduct) return <Loading />;
  const {
    _id: idOfProduct,
    title,
    description,
    price,
    rating,
    images,
    inStock,
    fastDelivery,
    categoryName,
  } = searchedProduct;

  const alreadyInWishList = isProductAlreadyInWishList(
    idOfProduct,
    wishlistState?.wishlist
  );
  const alreadyInCart = isProductAlreadyInCart(idOfProduct, cartState?.cart);

  const handleCart = () => {
    if (token) {
      if (alreadyInCart) {
        navigate("/cart");
      } else {
        addToCartService(searchedProduct, token, cartDispatch, setBtnDisabled);
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
        addToWishlistService(token, searchedProduct, wishlistDispatch);
      }
    } else {
      navigate("/login");
    }
  };

  console.log(inStock);
  return (
    <div className={styles.productDetailPage}>
      <div className={styles.productElement}>
        <div className={styles.productImg}>
          <img src={images} alt="product-image" />
        </div>
        <div className={styles.prodctDetails}>
          <div className={styles.productHeading}>
            <h1>{title}</h1>
            <div className={styles.productRating}>
              <Stars rating={rating} />
            </div>
            <div className={styles.productPrice}>
              <h3>₹{price} </h3>
            </div>
          </div>
          <hr />
          <div className={styles.productDescription}>
            <div className={styles.productDescription_row}>
              <p>Category:</p> <p>{categoryName}</p>
            </div>
            <div className={styles.productDescription_row}>
              <p>Stock:</p>
              <p>{inStock ? "Availaible" : "Not Availaible"}</p>
            </div>
            <div className={styles.productDescription_row}>
              <p>Fast Delivery:</p>
              <p>{fastDelivery ? "Yes" : "No"}</p>
            </div>
          </div>

          <div className={styles.productElementBtns}>
            <button
              className={alreadyInCart ? `inCartBtn` : `${styles.productBtn}`}
              onClick={handleCart}
              disabled={!inStock || btnDisabled}
            >
              {alreadyInCart ? "Go To Cart" : "Add To Cart"}
            </button>
            <button
              className={
                inStock ? `${styles.wishListBtn}` : `${styles.disabledBtn}`
              }
              disabled={!inStock || btnDisabled}
              onClick={handleWishlist}
            >
              {alreadyInWishList ? "Remove From WishList" : "Add To WishList"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
