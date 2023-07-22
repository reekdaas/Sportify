import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";
import popper from "../../utils/popper";
import {
  useAddressContext,
  useAuthContext,
  useCartContext,
} from "../../context";

import { getTotalCartAmount } from "../../utils/getProductUtils";
import { toast } from "react-hot-toast";

export default function CheckOutCard() {
  const { token, userData } = useAuthContext();
  const {
    cartState: { cart },
    removeFromCart,
  } = useCartContext();

  const {
    addressState: { selectedAddressId },
  } = useAddressContext();

  const navigate = useNavigate();

  const cleanCart = () => {
    cart.forEach(({ _id }) => {
      removeFromCart(_id, token);
    });
  };

  const handlePlaceOrder = () => {
    cleanCart();
    navigate("/ordersucess");
    popper();

    setTimeout(() => {
      navigate("/");
    }, 5000);
    toast.success("Order placed successfully");
  };

  const payment = () => {
    if (selectedAddressId) {
      const options = {
        key: "rzp_test_pW9wk40Jwa0h4z",
        key_secret: "EVgzy8WyBn3calx77DFJcGuQ",
        amount: Number(totalAmount) * 100,
        currency: "INR",
        name: "SporTiFy",
        description: "Checkout for Merch",
        handler: function (response) {
          handlePlaceOrder();
        },
        prefill: {
          name: userData?.name,
          email: userData?.email || "xyz@gmail.com",
          contact: "1234567890",
        },
        notes: {
          address: "SporTiFy Office",
        },
        theme: {
          color: "#455eb5",
        },
      };
      const pay = new window.Razorpay(options);
      pay.open();
    } else {
      toast.error("Select an address to proceed further");
    }
  };

  const amount = getTotalCartAmount(cart);

  const totalCartAmount = Math.round(amount - amount * 0.3);
  const totalItems = cart.reduce((acc, { qty }) => acc + qty, 0);

  const getDeliveryDate = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 3);
    const options = {
      day: "numeric",
      month: "long",
    };
    const deliveryDate = currentDate.toLocaleDateString("en-US", options);
    return deliveryDate;
  };

  const deliveryCharge = 50;

  const totalAmount = totalCartAmount + deliveryCharge;
  // console.log(getDeliveryDate());

  return (
    <div className={styles.checkOutCardContainer}>
      <div className={styles.orderListHeading}>
        <h1>Order List:</h1>
      </div>
      <div className={styles.orderListDetails}>
        <div className={`${styles.containerRow}`}>
          <p>Total Items:</p>
          <p>{totalItems}</p>
        </div>
      </div>
      <div className={styles.priceDetailsContainer}>
        <div className={styles.priceDetailsHeading}>
          <h1>Price Details:</h1>
        </div>
        <div className={styles.priceDetails}>
          <div className={styles.containerRow}>
            <p>Amount:</p>
            <p>{totalCartAmount}</p>
          </div>

          <div className={styles.containerRow}>
            <p>Shipping Charges:</p>
            <p>{deliveryCharge}</p>
          </div>
          <div className={styles.containerRow}>
            <p>Delivery By:</p>
            <p>{getDeliveryDate()}</p>
          </div>
          <div className={styles.containerRow}>
            <p>Total Amount:</p>
            <p>{totalAmount}</p>
          </div>
        </div>
      </div>

      <button className={styles.checkOutBtn} onClick={payment}>
        PLACE ORDER
      </button>
    </div>
  );
}
