import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./profilePage.module.css";

export default function ProfilePage() {
  const location = useLocation();
  const isLinkActive = location.pathname === "/profile";

  return (
    <div className={styles.profilePage}>
      <h1>Account Information</h1>
      <article className={styles.profilePageContainer}>
        <div className={styles.profilePageNavlink}>
          <NavLink
            to="/profile"
            className={
              isLinkActive
                ? `${styles.linkActive} ${styles.profilePageNavlinkItem} `
                : `${styles.profilePageNavlinkItem}`
            }
          >
            <span className={styles.navlinkitemHeader}>Profile</span>
          </NavLink>
          <NavLink
            to="useraddress"
            className={({ isActive }) =>
              isActive
                ? `${styles.linkActive} ${styles.profilePageNavlinkItem} `
                : `${styles.profilePageNavlinkItem}`
            }
          >
            <span className={styles.navlinkitemHeader}>Address</span>
          </NavLink>
        </div>
        <Outlet />
      </article>
    </div>
  );
}
