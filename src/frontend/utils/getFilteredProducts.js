const sortBySearchQuery = (allProducts, { filterBySearch }) => {
  if (filterBySearch.length === 0) return allProducts;
  return allProducts.filter(({ title }) =>
    title.toLowerCase().includes(filterBySearch.toLowerCase())
  );
};

const sortByPriceRange = (allProducts, { filterByPrice }) => {
  if (filterByPrice?.length == 0) return allProducts;

  return allProducts.filter(({ price }) => price > filterByPrice);
};

const filtersByCategory = (allProducts, { filterByCategories }) => {
  if (filterByCategories?.length === 0 || filterByCategories === "all")
    return allProducts;

  return allProducts.filter(
    ({ categoryName }) => categoryName === filterByCategories
  );
};

const filterByRatings = (allProducts, { filterByRating }) => {
  if (filterByRating?.length === 0) return allProducts;
  return allProducts.filter(({ rating }) => rating >= filterByRating * 1);
};

const sortByPrice = (allProducts, { sortByPrice }) => {
  if (sortByPrice === null) return allProducts;
  return allProducts.sort((a, b) =>
    sortByPrice === "HIGH_TO_LOW" ? b.price - a.price : a.price - b.price
  );
};

export default function getFilteredProducts(allProducts, filterState) {
  const arrayOfFunctions = [
    sortBySearchQuery,
    sortByPriceRange,
    filtersByCategory,
    filterByRatings,
    sortByPrice,
  ];
  // return filtersByCategory(allProducts, filterState);
  // return filterByRatings(allProducts, filterState);
  // return sortByPrice(allProducts, filterState);

  arrayOfFunctions.forEach(
    (currentFunction) =>
      (allProducts = currentFunction(allProducts, filterState))
  );

  return allProducts;
}
