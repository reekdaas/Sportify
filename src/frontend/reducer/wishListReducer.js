export const initialWishlistState = {
  wishlist: [],
};

export function wishListReducer(state, { type, payload }) {
  switch (type) {
    case "DISPLAY_WISHLIST": {
      return { ...state, wishlist: [...payload] };
    }
    case "ADD_TO_WISHLIST": {
      return { ...state, wishlist: [...payload] };
    }
    case "REMOVE_FROM_WISHLIST": {
      return { ...state, wishlist: [...payload] };
    }
    default: {
      return state;
    }
  }
}
