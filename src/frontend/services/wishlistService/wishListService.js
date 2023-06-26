import axios from "axios";

export const getWishlistService = async (encodedToken, wishlistDispatch) => {
  try {
    const response = await axios.get("/api/user/wishlist", {
      headers: { authorization: encodedToken },
    });
    const {
      status,
      data: { wishlist },
    } = response;
    if (status === 200) {
      wishlistDispatch({ type: "DISPLAY_WISHLIST", payload: wishlist });
    }
  } catch (err) {
    console.error(err);
  }
};

export const addToWishlistService = async (
  encodedToken,
  product,
  wishlistDispatch
) => {
  try {
    const response = await axios.post(
      "/api/user/wishlist",
      {
        product,
      },
      { headers: { authorization: encodedToken } }
    );
    const {
      status,
      data: { wishlist },
    } = response;
    if (status === 201) {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: wishlist });
    }
  } catch (err) {
    console.error(err);
  }
};

export const removeFromWishlistService = async (
  encodedToken,
  productId,
  wishlistDispatch
) => {
  try {
    const response = await axios.delete(`/api/user/wishlist/${productId}`, {
      headers: { authorization: encodedToken },
    });
    // console.log(response);
    const {
      status,
      data: { wishlist },
    } = response;
    if (status === 200) {
      wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: wishlist });
    }
  } catch (err) {
    console.error(err);
  }
};
