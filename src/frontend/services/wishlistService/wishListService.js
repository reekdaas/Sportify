import axios from "axios";

export const getWishlistService = async (encodedToken) =>
  await axios.get("/api/user/wishlist", {
    headers: { authorization: encodedToken },
  });

export const addToWishlistService = async (encodedToken, product) =>
  await axios.post(
    "/api/user/wishlist",
    {
      product,
    },
    { headers: { authorization: encodedToken } }
  );

export const removeFromWishlistService = async (encodedToken, productId) =>
  await axios.delete(`/api/user/wishlist/${productId}`, {
    headers: { authorization: encodedToken },
  });
