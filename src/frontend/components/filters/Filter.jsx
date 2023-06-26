import { useFilterContext, useProductContext } from "../../context";
import styles from "./Filter.module.css";

export default function Filter() {
  const { filterProductState, filterProductDispatch } = useFilterContext();
  const { productState } = useProductContext();
  const { categoriesList } = productState;
  const handleFilter = (e, filterType) => {
    filterProductDispatch({ type: filterType, payload: e.target.value });
    // console.log(filterType);
    // console.log(e.target.value);
  };
  const clearFilters = () => {
    filterProductDispatch({ type: "CLEAR_FILTERS" });
  };

  const ratings = [4, 3, 2, 1];
  // console.log(categoriesList);
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHead}>
        <h3 className={styles.filterHeading}>Filters</h3>

        <div>
          <button className={styles.filterBtn} onClick={clearFilters}>
            Clear
          </button>
        </div>
      </div>
      <div className={styles.filterPrice}>
        <h4>Price:</h4>
        <div className={styles.filterPricecontainer}>
          <div className={styles.priceRange}>
            <p>50</p>
            <p>600</p>
          </div>
          <input
            type="range"
            name="rangeInput"
            className={styles.slider}
            min="50"
            max="600"
            step="50"
            value={filterProductState.filterByPrice}
            onChange={(e) => {
              handleFilter(e, "FILTER_BY_PRICE");
            }}
          />
        </div>
      </div>
      <div className={styles.filterCategory}>
        <h4>Category</h4>
        <ul>
          {[, ...categoriesList, { id: 3, categoryName: "all" }]?.map(
            ({ _id, categoryName }) => {
              return (
                <li key={_id} className={styles.categoryListItem}>
                  <input
                    type="radio"
                    name="category"
                    id={categoryName}
                    value={categoryName}
                    checked={
                      categoryName === filterProductState.filterByCategories
                    }
                    onChange={(e) => {
                      handleFilter(e, "FILTER_BY_CATEGORIES");
                    }}
                  />
                  <label htmlFor={categoryName}>{categoryName}</label>
                </li>
              );
            }
          )}
        </ul>
      </div>
      <div className={styles.filterRatings}>
        <h4>Ratings</h4>
        <ul>
          {ratings.map((rating) => {
            return (
              <li className={styles.ratingListItem} key={rating}>
                <input
                  type="radio"
                  name="ratings"
                  id={rating}
                  value={rating}
                  checked={rating === filterProductState.filterByRating * 1}
                  onChange={(e) => {
                    handleFilter(e, "FILTER_BY_RATING");
                  }}
                />
                <label htmlFor={rating}>{rating} stars & above</label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.filterSorting}>
        <h4>Sort By</h4>
        <ul>
          {" "}
          <li className={styles.filterSortingItem}>
            <label className="sortInput">
              <input
                type="radio"
                name="SORT"
                value="HIGH_TO_LOW"
                checked={"HIGH_TO_LOW" === filterProductState.sortByPrice}
                onChange={(e) => {
                  handleFilter(e, "SORT_BY_PRICE");
                }}
              />
              High To Low
            </label>
          </li>
          <li className={styles.filterSortingItem}>
            {" "}
            <label className="sortInput">
              <input
                type="radio"
                name="SORT"
                value="LOW_TO_HIGH"
                checked={"LOW_TO_HIGH" === filterProductState.sortByPrice}
                onChange={(e) => {
                  handleFilter(e, "SORT_BY_PRICE");
                }}
              />
              Low To High
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}
