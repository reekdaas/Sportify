import React from "react";
import styles from "./featuredProduct.module.css";
import { useProductContext } from "../../context";
import CardComponent from "../card/cardComponent";

export default function FeaturedProducts() {
  const { productState, productDispatch } = useProductContext();
  const {
    product_loading: loading,
    products_error: error,
    featured_products: featured,
  } = productState;
  // console.log(featured);
  return (
    <div className={styles.featuredContainer}>
      <h1 className={styles.featuredHeading}>Featured Products</h1>
      <div className={styles.featuredCards}>
        {featured?.map((product) => (
          <CardComponent key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
}
