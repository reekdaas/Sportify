import CardComponent from "../../components/card/cardComponent";
import Spinner from "../../components/spinner/spinner";
import { useWishListContext } from "../../context";
import styles from "./wishList.module.css";

export default function WishListPage() {
  const { wishlistState, loading } = useWishListContext();
  const wishListProduct = wishlistState?.wishlist;
  return (
    <div className={styles.wishlistContainer}>
      {loading ? (
        <div className={styles.spinner}>
          {" "}
          <Spinner />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
