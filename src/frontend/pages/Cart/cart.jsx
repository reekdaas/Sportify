import { useNavigate } from "react-router-dom";
import CartCard from "../../components/Cart/cartCard";
import { OrderDetails } from "../../components/Order/orderDetails";
import { useCartContext } from "../../context";
import styles from "./cart.module.css";

export default function Cart() {
  const navigate = useNavigate();
  const { cartState } = useCartContext();
  const cartItems = cartState?.cart;
  // console.log(cartState?.cart);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        {" "}
        <h2>Total Cart Items : {cartItems.length}</h2>{" "}
      </div>
      {cartItems.length === 0 ? (
        <button
          onClick={() => {
            navigate("/products");
          }}
          className={styles.cartPageBtn}
        >
          Back To Home
        </button>
      ) : (
        <div className={styles.cartContainer}>
          <div className={styles.cartCardContainer}>
            {cartItems.map((data) => (
              <CartCard product={data} key={data.id} />
            ))}
          </div>
          <OrderDetails />
        </div>
      )}
    </div>
  );
}

/* 
// const cartItems = [
//   {
//     id: 11,
//     title: "REAL MADRID Shorts",
//     description: "",
//     price: 399,
//     // discountPercentage: 12.9,
//     rating: 3,
//     images:
//       "https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/b2ae5ecec3df4a6aa4c0ad2b01292981_9366/real-madrid-21-22-home-shorts.jpg",
//     inStock: true,
//     fastDelivery: false,
//     categoryName: "Shorts",
//     isFeatured: true,
//   },
//   {
//     id: 12,
//     title: "BORUSSIA DORTMUND Shorts",
//     description: "",
//     price: 249,
//     // discountPercentage: 12.9,
//     rating: 3,
//     images:
//       "https://images.footballfanatics.com/borussia-dortmund/borussia-dortmund-away-shorts-2022-23_ss4_p-13311874+u-16u2caw98y6wpt36gtqi+v-b77f44d6227643bdbf1590c67d3432c0.jpg?_hv=2&w=340",
//     inStock: true,
//     fastDelivery: true,
//     categoryName: "Shorts",
//     isFeatured: false,
//   },
//   {
//     id: 12,
//     title: "BORUSSIA DORTMUND Shorts",
//     description: "",
//     price: 249,
//     // discountPercentage: 12.9,
//     rating: 3,
//     images:
//       "https://images.footballfanatics.com/borussia-dortmund/borussia-dortmund-away-shorts-2022-23_ss4_p-13311874+u-16u2caw98y6wpt36gtqi+v-b77f44d6227643bdbf1590c67d3432c0.jpg?_hv=2&w=340",
//     inStock: true,
//     fastDelivery: true,
//     categoryName: "Shorts",
//     isFeatured: false,
//   },
//   {
//     id: 12,
//     title: "BORUSSIA DORTMUND Shorts",
//     description: "",
//     price: 249,
//     // discountPercentage: 12.9,
//     rating: 3,
//     images:
//       "https://images.footballfanatics.com/borussia-dortmund/borussia-dortmund-away-shorts-2022-23_ss4_p-13311874+u-16u2caw98y6wpt36gtqi+v-b77f44d6227643bdbf1590c67d3432c0.jpg?_hv=2&w=340",
//     inStock: true,
//     fastDelivery: true,
//     categoryName: "Shorts",
//     isFeatured: false,
//   },
//   {
//     id: 12,
//     title: "BORUSSIA DORTMUND Shorts",
//     description: "",
//     price: 249,
//     // discountPercentage: 12.9,
//     rating: 3,
//     images:
//       "https://images.footballfanatics.com/borussia-dortmund/borussia-dortmund-away-shorts-2022-23_ss4_p-13311874+u-16u2caw98y6wpt36gtqi+v-b77f44d6227643bdbf1590c67d3432c0.jpg?_hv=2&w=340",
//     inStock: true,
//     fastDelivery: true,
//     categoryName: "Shorts",
//     isFeatured: false,
//   },
// ];

// const cartItems = [];

*/
