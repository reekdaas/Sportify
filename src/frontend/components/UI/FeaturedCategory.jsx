import React, { useContext } from "react";
import styles from "./featuredCategory.module.css";
import { useProductContext } from "../../context/products/productsProvider";
import { Link } from "react-router-dom";
import { useFilterContext } from "../../context";
import Spinner from "../spinner/spinner";

export default function FeaturedCategory() {
  const { filterProductDispatch } = useFilterContext();
  const { productState, loading } = useProductContext();
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
      {loading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
