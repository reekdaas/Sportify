import React, { useContext } from "react";
import styles from "./featuredCategory.module.css";
import { ProductsContext } from "../../context/products/productsProvider";
import { Link } from "react-router-dom";
import { useFilterContext } from "../../context";

export default function FeaturedCategory() {
  const { filterProductDispatch } = useFilterContext();
  const { productState } = useContext(ProductsContext);
  const handleCLick = (categoryName) => {
    // console.log(categoryName);
    filterProductDispatch({ type: "CLEAR_FILTERS" });
    filterProductDispatch({
      type: "FILTER_BY_CATEGORIES",
      payload: categoryName,
    });
  };

  return (
    <div className={styles.featuredSection}>
      <h2 className={styles.featuredHeading}>Explore Categories</h2>
      <div className={styles.featuredContainer}>
        {productState?.categoriesList?.map(({ _id, categoryName }) => (
          <Link
            to="/products"
            key={_id}
            onClick={() => {
              handleCLick(categoryName);
            }}
          >
            <div className={styles.featureCard}>
              <h1 className={styles.featureCardTitle}>{categoryName}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
