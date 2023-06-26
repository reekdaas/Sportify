import styles from "./hero.module.css";
import { useNavigate } from "react-router-dom";
import heroImage from "../../assests/images/1.jpg";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div>
      {/* <article className={styles.content}>
        <h1>Welcome To SportiFy</h1>
        <p>One stop solution for your sporting needs.</p>
        <Link to="/products" className="btn ">
          shop now
        </Link>
      </article> */}
      <div className={styles.imgContainer}>
        <img src={heroImage} className={styles.mainImg} alt="heroImage" />
      </div>
      <div className={styles.heroOverlay}></div>
      <article className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <h1>Welcome To SportiFy</h1>
          <button
            onClick={() => {
              navigate("/products");
            }}
            className={styles.heroBtn}
          >
            shop now
          </button>
          =
        </div>
      </article>
    </div>
  );
}
