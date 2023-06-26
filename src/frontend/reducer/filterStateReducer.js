const initialFilter = {
  filterBySearch: "",
  filterByPrice: "50",
  filterByCategories: "",
  filterByRating: "",
  sortByPrice: "",
};
export const filterProductReducer = (state, { type, payload }) => {
  switch (type) {
    case "FILTER_BY_SEARCH": {
      return {
        ...state,
        filterBySearch: payload,
      };
    }
    case "FILTER_BY_CATEGORIES": {
      return { ...state, filterByCategories: payload };
    }
    case "FILTER_BY_PRICE": {
      return { ...state, filterByPrice: payload };
    }
    case "FILTER_BY_RATING": {
      return { ...state, filterByRating: payload };
    }
    case "SORT_BY_PRICE": {
      return { ...state, sortByPrice: payload };
    }
    case "CLEAR_FILTERS": {
      return initialFilter;
    }
    default:
      return;
  }
};
