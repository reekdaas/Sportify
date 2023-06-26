import "./App.css";
import { Routes, Route } from "react-router-dom";
import MockAPI from "./backend/Mockman";
import { HomePage } from "./frontend/pages";
import { Footer, Navbar, ProductElement } from "./frontend/components";
import ErrorPage from "./frontend/pages/error/errorPage";
import ProductListing from "./frontend/pages/products/productListing";
import Cart from "./frontend/pages/Cart/cart";
import Login from "./frontend/pages/LogIn/login";
import RequiredAuth from "./frontend/protectedRoute/requiredAuth";
import WishListPage from "./frontend/pages/wishlist/wishList";
import CheckOut from "./frontend/pages/checkOut/checkOut";
import ProfilePage from "./frontend/pages/profile/profilePage";
import ProfileCard from "./frontend/components/profile/profileCard";
import UserAddress from "./frontend/components/profile/addresses";
import OrderSucess from "./frontend/pages/checkOut/orderSucess";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:productId" element={<ProductElement />} />
        <Route path="/mockman" element={<MockAPI />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <RequiredAuth>
              <Cart />
            </RequiredAuth>
          }
        />
        <Route
          path="/wishlist"
          element={
            <RequiredAuth>
              <WishListPage />
            </RequiredAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequiredAuth>
              <CheckOut />
            </RequiredAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequiredAuth>
              <ProfilePage />
            </RequiredAuth>
          }
        >
          <Route index element={<ProfileCard />} />
          <Route path="useraddress" element={<UserAddress />} />
        </Route>
        <Route
          path="/ordersucess"
          element={
            <RequiredAuth>
              <OrderSucess />
            </RequiredAuth>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
