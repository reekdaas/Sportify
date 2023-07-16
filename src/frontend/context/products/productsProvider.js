import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import {
  initialProductState,
  productStateReducer,
} from "../../reducer/productsStateReducer";

export const ProductsContext = createContext(null);

export default function ProductsContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [productState, productDispatch] = useReducer(
    productStateReducer,
    initialProductState
  );
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/products");
      // console.log(response);
      const {
        data: { products },
        status,
      } = response;
      if (status === 200) {
        productDispatch({
          type: "ADD_PRODUCT_LIST",
          payload: products,
        });
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const fetchAllCategory = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/categories");
      const {
        data: { categories },
        status,
      } = response;
      if (status === 200) {
        productDispatch({
          type: "ADD_CATEGORIES",
          payload: categories,
        });
      }
    } catch (err) {
      // console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategory();
  }, []);

  const value = { productState, productDispatch, loading };
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
