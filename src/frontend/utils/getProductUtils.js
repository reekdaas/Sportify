//! This function checks whether the product is already present in wishlist or not

export const isProductAlreadyInWishList = (productId, allProducts) => {
  return allProducts.some(({ _id }) => _id === productId);
};

//! This function checks whether the product is already present in cart or not

export const isProductAlreadyInCart = (productId, allProducts) => {
  return allProducts.some(({ _id }) => _id === productId);
};

// ! This function helps to get total cart amount

export const getTotalCartAmount = (cart) => {
  return cart.reduce((acc, cur) => acc + cur?.price * cur.qty, 0);
};
