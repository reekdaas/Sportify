import axios from "axios";

export const fetchCategories = async (productDispatch) => {
  productDispatch({ type: "FETCHING_BEGINS" });
  try {
    const res = await axios.get("/api/categories");
    if (res.status === 200)
      productDispatch({
        type: "ADD_CATEGORIES",
        payload: res.data.categories,
      });
  } catch (e) {
    productDispatch({
      type: "ERROR",
    });
    console.log(e.error);
  }
};
