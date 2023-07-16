import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import cartReducer, { initialCartState } from "../../reducer/cartReducer";
import {
  addToCartService,
  getCartServices,
  removeFromCartServices,
  updateCartQuantityServices,
} from "../../services/cartService/cartServices";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../auth/AuthContext";

const CartContext = createContext(null);
export function CartContextProvider({ children }) {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);

  const getCart = async (token) => {
    try {
      setLoading(true);
      const response = await getCartServices(token);
      const {
        data: { cart },
        status,
      } = response;
      if (status === 200) {
        cartDispatch({ type: "DISPLAY_CART", payload: cart });
      }
      // console.log(response);
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, token) => {
    try {
      setLoading(true);

      const response = await addToCartService(product, token);
      const {
        status,
        data: { cart },
      } = response;
      if (status === 201) {
        cartDispatch({ type: "ADD_TO_CART", payload: cart });
        toast.success("Product added to cart!");
      }
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong");
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const removeFromCart = async (productId, token) => {
    try {
      setLoading(true);

      const response = await removeFromCartServices(productId, token);
      const {
        status,
        data: { cart },
      } = response;
      if (status === 200) {
        cartDispatch({ type: "REMOVE_FROM_CART", payload: cart });
        // toast.success("Product removed from cart!");
      }
    } catch (err) {
      toast.error("Something went wrong");
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const updateQuantityInCart = async (productId, token, type) => {
    try {
      setDisabledBtn(true);
      const response = await updateCartQuantityServices(productId, token, type);
      const {
        status,
        data: { cart },
      } = response;

      if (status === 200) {
        cartDispatch({ type: "UPDATE_QUANTITY_IN_CART", payload: cart });
        // toast.success("")
      }
    } catch (err) {
      // console.log(err);
      toast.error("Something went wrong");
    } finally {
      setDisabledBtn(false);
    }
  };
  useEffect(() => {
    if (token) {
      getCart();
    }
  }, [token]);

  const value = {
    cartState,
    cartDispatch,
    getCart,
    addToCart,
    removeFromCart,
    loading,
    updateQuantityInCart,
    disabledBtn,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  return context;
}
