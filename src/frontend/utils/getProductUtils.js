export const isProductAlreadyInWishList = (productId, allProducts) => {
  return allProducts.some(({ _id }) => _id === productId);
};

export const isProductAlreadyInCart = (productId, allProducts) => {
  return allProducts.some(({ _id }) => _id === productId);
};

export const getTotalCartAmount = (cart) => {
  return cart.reduce((acc, cur) => acc + cur?.price * cur.qty, 0);
};
