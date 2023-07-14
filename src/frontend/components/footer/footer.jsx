import { Link, useNavigate } from "react-router-dom";
import styles from "./footer.module.css";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";

export default function Footer() {
  const naviagte = useNavigate();
  return (
    <div className={styles.footer}>
      <h3
        onClick={() => {
          naviagte("/");
        }}
      >
        SporTiFy
      </h3>
      <h2 className={styles.footerHeading}>
        &copy;{new Date().getFullYear()}
        <span>SporTiFy</span> @No Copyright
      </h2>

      <ul className={styles.footerSocials}>
        <li>
          <Link
            className={styles.exploreLink}
            to={"https://github.com/reekdaas"}
            target="_blank"
          >
            <BsGithub />
          </Link>
        </li>
        <li>
          <Link
            className={styles.exploreLink}
            to={"https://www.linkedin.com/in/rittik-das-796895180"}
            target="_blank"
          >
            <BsLinkedin />
          </Link>
        </li>
        <li>
          <Link
            className={styles.exploreLink}
            to="https://twitter.com/ReekDas111"
            target="_blank"
          >
            <BsTwitter />
          </Link>
        </li>
      </ul>
    </div>
  );
}
