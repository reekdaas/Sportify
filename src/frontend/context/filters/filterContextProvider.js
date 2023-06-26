import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "../products/productsProvider";
import { filterProductReducer } from "../../reducer/filterStateReducer";

export const FilterContext = createContext(null);

export function FilterContextProvider({ children }) {
  const initialFilter = {
    filterBySearch: "",
    filterByPrice: "",
    filterByCategories: "",
    filterByRating: "",
    sortByPrice: "",
  };

  const [filterProductState, filterProductDispatch] = useReducer(
    filterProductReducer,
    initialFilter
  );

  // console.log(filterProductState);

  const value = { filterProductState, filterProductDispatch };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  return context;
};
