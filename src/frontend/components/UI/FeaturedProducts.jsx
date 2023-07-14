import React from "react";
import styles from "./featuredProduct.module.css";
import { useProductContext } from "../../context";
import CardComponent from "../card/cardComponent";
import Spinner from "../spinner/spinner";

export default function FeaturedProducts() {
  const { productState, loading } = useProductContext();
  const { featured_products: featured } = productState;
  // console.log(featured);
  return (
    <div className={styles.featuredContainer}>
      {loading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className={styles.featuredHeading}>Featured Products</h1>
          <div className={styles.featuredCards}>
            {featured?.map((product) => (
              <CardComponent key={product?._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
