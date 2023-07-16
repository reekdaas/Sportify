export const initialProductState = {
  productList: [],
  categoriesList: [],
  featured_products: [],
};

export const productStateReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_PRODUCT_LIST": {
      const featuredProduct = payload.filter(({ isFeatured }) => isFeatured);
      return {
        ...state,
        productList: [...payload],
        featured_products: featuredProduct,
      };
    }
    case "ADD_CATEGORIES":
      return { ...state, categoriesList: payload };

    default:
      return { ...state };
  }
};
