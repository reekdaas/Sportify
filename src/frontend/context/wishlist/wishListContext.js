import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  initialWishlistState,
  wishListReducer,
} from "../../reducer/wishListReducer";
import {
  addToWishlistService,
  getWishlistService,
  removeFromWishlistService,
} from "../../services/wishlistService/wishListService";
import { useAuthContext } from "../auth/AuthContext";
import { toast } from "react-hot-toast";

export const WishListContetxt = createContext(null);
export function WishListContetxProvider({ children }) {
  const { token } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [wishlistState, wishlistDispatch] = useReducer(
    wishListReducer,
    initialWishlistState
  );

  const getWishlist = async (token) => {
    try {
      setLoading(true);
      const response = await getWishlistService(token);
      const {
        status,
        data: { wishlist },
      } = response;
      if (status === 200) {
        wishlistDispatch({ type: "DISPLAY_WISHLIST", payload: wishlist });
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const addToWishlist = async (token, product) => {
    try {
      setLoading(true);
      const response = await addToWishlistService(token, product);
      // console.log(response);
      const {
        status,
        data: { wishlist },
      } = response;
      if (status === 201) {
        wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
        toast.success("Product added to wishlist");
      }
    } catch (err) {
      // console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const removeFromWishlist = async (token, productId) => {
    try {
      setLoading(true);
      const response = await removeFromWishlistService(token, productId);
      const {
        status,
        data: { wishlist },
      } = response;
      if (status === 200) {
        wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: wishlist });
        toast.success("Product removed from wishlist!");
      }
    } catch (err) {
      // console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist(token);
  }, [token]);

  const value = {
    wishlistState,
    wishlistDispatch,
    addToWishlist,
    removeFromWishlist,
    loading,
  };
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
