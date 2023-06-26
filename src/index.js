import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AddressContextProvider,
  FilterContextProvider,
  ProductsContextProvider,
  WishListContetxProvider,
} from "./frontend/context";
import { AuthContextProvider } from "./frontend/context/auth/AuthContext";
import { CartContextProvider } from "./frontend/context/cart/cartContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ProductsContextProvider>
          <FilterContextProvider>
            <WishListContetxProvider>
              <CartContextProvider>
                <AddressContextProvider>
                  <App />
                </AddressContextProvider>
              </CartContextProvider>
            </WishListContetxProvider>
          </FilterContextProvider>
        </ProductsContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
