import { createContext, useContext, useReducer } from "react";
import cartReducer, { initialCartState } from "../../reducer/cartReducer";
import { useAuthContext } from "../auth/AuthContext";

const CartContext = createContext(null);
export function CartContextProvider({ children }) {
  const { token } = useAuthContext();
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  // console.log(cartState);

  const value = { cartState, cartDispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  return context;
}
