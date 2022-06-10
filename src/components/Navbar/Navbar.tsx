import styles from "./Navbar.module.scss";
import { useAuth } from "../../context/AuthContextProvider";
import { Link } from "react-router-dom";
import login from "./../../assets/logIn.svg";
import classNames from "classnames";
import { Routes } from "./../../constants/constats";

const Navbar = () => {
  const { logged, isLoggedAnyUser } = useAuth();
  return (
    <div className={styles.navbar}>
      <div className={classNames("container", styles.navbarElements)}>
        {isLoggedAnyUser && (
          <Link to={Routes.movies} className={styles.title}>
            Filmy
          </Link>
        )}
        {!logged && (
          <Link to={Routes.login}>
            <img src={login} className={styles.icon} />
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
