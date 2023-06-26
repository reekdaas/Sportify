import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { productStateReducer } from "../../reducer/productsStateReducer";
import { fetchProductList } from "../../services/fetchData/fetchProduct";
import { fetchCategories } from "../../services/fetchData/fetchCategories";

export const ProductsContext = createContext(null);

export default function ProductsContextProvider({ children }) {
  const initialProductState = {
    productList: [],
    categoriesList: [],
    product_loading: false,
    products_error: false,
    featured_products: [],
  };

  const [productState, productDispatch] = useReducer(
    productStateReducer,
    initialProductState
  );

  useEffect(() => {
    fetchProductList(productDispatch);
    fetchCategories(productDispatch);
  }, []);

  const value = { productState, productDispatch };
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProductContext = () => {
  const context = useContext(ProductsContext);
  return context;
};
