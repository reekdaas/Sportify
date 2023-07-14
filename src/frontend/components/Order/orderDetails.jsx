import React from "react";
import styles from "./orderdetails.module.css";
import { useCartContext } from "../../context";
import { getTotalCartAmount } from "../../utils/getProductUtils";
import { useNavigate } from "react-router-dom";

export function OrderDetails() {
  const { cartState } = useCartContext();
  const navigate = useNavigate();

  const totalCartAmount = getTotalCartAmount(cartState?.cart);
  const savings = Math.round(totalCartAmount * 0.3);

  const priceAfterDiscount = totalCartAmount - savings;

  return (
    <div className={styles.orderContainer}>
      <h2>Price Summary:</h2>
      <div className={styles.orderSummary}>
        <div className={styles.orderSummaryRow}>
          <p>Price: </p>
          <p>{totalCartAmount}</p>
        </div>
        <div className={styles.orderSummaryRow}>
          <p>Discount:</p>
          <p>-30%</p>
        </div>
        {/* <div className={styles.orderSummaryRow}>
          <p>Shipping Charges:</p>
          <p>50</p>
        </div> */}
        <div className={styles.orderSummaryRow}>
          <p>You will save:</p>
          <p>{savings}</p>
        </div>
        <div className={styles.orderSummaryRow}>
          <p>Total Price:</p>
          <p>{priceAfterDiscount}</p>
        </div>
      </div>

      <button
        className={styles.orderBtn}
        onClick={() => {
          navigate("/checkout");
        }}
      >
        Procced To Buy
      </button>
    </div>
  );
}
