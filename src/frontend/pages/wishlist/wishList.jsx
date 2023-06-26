import CardComponent from "../../components/card/cardComponent";
import { useWishListContext } from "../../context";
import { isProductAlreadyInWishList } from "../../utils/getProductUtils";
import styles from "./wishList.module.css";

// const wishListProduct = [];

export default function WishListPage() {
  const { wishlistState } = useWishListContext();
  const wishListProduct = wishlistState?.wishlist;
  console.log(wishlistState?.wishlist);

  return (
    <div className={styles.wishlistContainer}>
      {wishListProduct.length === 0 && (
        <div className={styles.emptyWishlist}>
          <h1>Wishlist is empty!!!!</h1>
        </div>
      )}

      {wishListProduct.length > 0 && (
        <>
          <div className={styles.wishlistHeading}>
            <h1>Total Wishlist Items: {wishListProduct.length}</h1>
          </div>
          <div className={styles.wishlistCardsContainer}>
            {wishListProduct.map((product) => (
              <CardComponent product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
