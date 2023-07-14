import { createContext, useContext, useReducer } from "react";
import {
  addressReducer,
  initialAddressState,
} from "../../reducer/addressReducer";

export const AddressContext = createContext(null);
export function AddressContextProvider({ children }) {
  const [addressState, addressDispatch] = useReducer(
    addressReducer,
    initialAddressState
  );
  // console.log(addressState);
  const value = { addressState, addressDispatch };
  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
}

export function useAddressContext() {
  const context = useContext(AddressContext);
  return context;
}
