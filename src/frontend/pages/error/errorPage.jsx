import styles from "./errorpage.module.css";
import { useNavigate } from "react-router-dom";
import errorImage from "../../assests/gifs/error.webp";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <img src={errorImage} alt="errorImg" className={styles.errorImage} />
      <section>
        <h3>Sorry, The page you tried cannot be found</h3>
        <button
          className={styles.errorPageBtn}
          onClick={() => {
            navigate("/");
          }}
        >
          Back To Home
        </button>
      </section>
    </div>
  );
}
