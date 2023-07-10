import axios from "axios";

export const getCartServices = async (encodedToken, cartDispatch) => {
  try {
    const response = await axios.get("/api/user/cart", {
      headers: {
        authorization: encodedToken,
      },
    });

    const {
      status,
      data: { cart },
    } = response;

    if (status === 200) {
      cartDispatch({ type: "DISPLAY_CART", payload: cart });
    }
  } catch (err) {
    console.error(err);
  }
};

export const addToCartService = async (
  product,
  encodedToken,
  cartDispatch,
  setBtnDisable
) => {
  try {
    setBtnDisable(true);
    const response = await axios.post(
      "/api/user/cart",
      { product },
      {
        headers: { authorization: encodedToken },
      }
    );

    const {
      status,
      data: { cart },
    } = response;
    if (status === 201) {
      cartDispatch({ type: "ADD_TO_CART", payload: cart });
      setBtnDisable(false);
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeItemFromCartServices = async (
  productId,
  encodedToken,
  cartDispatch
) => {
  try {
    const response = await axios.delete(`/api/user/cart/${productId}`, {
      headers: { authorization: encodedToken },
    });
    console.log(response);
    const {
      status,
      data: { cart },
    } = response;
    if (status === 200) {
      cartDispatch({ type: "REMOVE_FROM_CART", payload: cart });
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateCartQuantityServices = async (
  productId,
  encodedToken,
  type,
  cartDispatch
) => {
  try {
    console.log(productId);
    const response = await axios.post(
      `/api/user/cart/${productId}`,
      { action: { type: type } },
      { headers: { authorization: encodedToken } }
    );
    console.log(response);
    const {
      status,
      data: { cart },
    } = response;
    // console.log(response);
    if (status === 200) {
      cartDispatch({ type: "UPDATE_QUANTITY_IN_CART", payload: cart });
    }
    // console.log(cart);
  } catch (err) {
    console.error(err);
  }
};
