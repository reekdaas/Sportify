export const productStateReducer = (state, { type, payload }) => {
  switch (type) {
    case "FETCHING_BEGINS":
      return { ...state, product_loading: true };
    case "ADD_PRODUCT_LIST": {
      const featuredProduct = payload.filter(({ isFeatured }) => isFeatured);
      return {
        ...state,
        productList: [...payload],
        product_loading: false,
        featured_products: featuredProduct,
      };
    }

    case "ADD_CATEGORIES":
      return { ...state, categoriesList: payload, product_loading: false };
    case "ERROR":
      return { ...state, product_loading: false, products_error: true };

    default:
      return { ...state };
  }
};
