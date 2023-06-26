import { createContext, useContext, useReducer } from "react";
import {
  initialWishlistState,
  wishListReducer,
} from "../../reducer/wishListReducer";

export const WishListContetxt = createContext(null);
export function WishListContetxProvider({ children }) {
  const [wishlistState, wishlistDispatch] = useReducer(
    wishListReducer,
    initialWishlistState
  );

  // console.log(wishlistState);

  const value = { wishlistState, wishlistDispatch };
  return (
    <WishListContetxt.Provider value={value}>
      {children}
    </WishListContetxt.Provider>
  );
}

export function useWishListContext() {
  const context = useContext(WishListContetxt);
  return context;
}
