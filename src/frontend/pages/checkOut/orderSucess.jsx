import dance from "../../assests/gifs/chldDance.webp";
import styles from "./orderSucess.module.css";

export default function OrderSucess() {
  return (
    <div className={styles.sucessContainer}>
      <h1 className={styles.sucessHeading}>Order Placed Sucessfully </h1>
      <div className={styles.sucessGif}>
        <img src={dance} alt="xyx" />
      </div>
    </div>
  );
}
