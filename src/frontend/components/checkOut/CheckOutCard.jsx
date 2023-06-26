import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";
import popper from "../../utils/popper";
import {
  useAddressContext,
  useAuthContext,
  useCartContext,
  useWishListContext,
} from "../../context";
import { removeItemFromCartServices } from "../../services/cartService/cartServices";
import { getTotalCartAmount } from "../../utils/getProductUtils";

export default function CheckOutCard() {
  let showWarning;
  const { token } = useAuthContext();
  const {
    cartState: { cart },
    cartDispatch,
  } = useCartContext();

  const {
    addressState: { selectedAddressId },
  } = useAddressContext();

  const navigate = useNavigate();

  // console.log(cart);
  const cleanCart = () => {
    cart.forEach(({ _id }) => {
      removeItemFromCartServices(_id, token, cartDispatch);
    });
  };

  const handlePlaceOrder = () => {
    if (selectedAddressId) {
      cleanCart();
      navigate("/ordersucess");
      popper();

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      showWarning = "PLEASE SELECT AN ADDRESS TO PROCEED FURTHER";
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
      <hr />

      <div className={styles.orderListDetails}>
        <div className={styles.containerRow}>
          <p>Item List:</p>
          <p>Qty</p>
        </div>
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
          {showWarning && (
            <div className={styles.containerRow}>
              <p className={styles.warningText}>{showWarning}</p>
            </div>
          )}
        </div>
      </div>

      <button className={styles.checkOutBtn} onClick={handlePlaceOrder}>
        PLACE ORDER
      </button>
    </div>
  );
}
