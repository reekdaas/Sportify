import axios from "axios";

export const fetchProductList = async (productDispatch) => {
  try {
    const res = await axios.get("/api/products");
    if (res.status === 200) {
      productDispatch({
        type: "ADD_PRODUCT_LIST",
        payload: res?.data?.products,
      });
    }
  } catch (e) {
    console.log(e.error);
  }
};
