import CheckOutCard from "../../components/checkOut/CheckOutCard";
import AddressCard from "../../components/checkOut/addressCard";
import styles from "./checkout.module.css";
export default function CheckOut() {
  // const [selectedAddress, setSelectedAddress] = useState();

  return (
    <div className={styles.checkoutPage}>
      <h1 className={styles.checkoutHeader}>Checkout</h1>

      <div className={styles.checkoutContent}>
        <AddressCard />
        <CheckOutCard />
      </div>
    </div>
  );
}
