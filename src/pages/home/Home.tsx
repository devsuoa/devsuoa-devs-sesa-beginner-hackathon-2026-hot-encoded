import { Link } from 'react-router';
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <img src={`${import.meta.env.BASE_URL}SSTRUK-logo.png?v=5`} alt="SSTRUK Logo" className={styles.logo} />
      <p className={styles.slogan}>when your soulmate is a galaxy away...</p>
      <Link to="/signup" className={styles.enterOrbitBtn}>
        enter orbit
      </Link>
    </div>
  );
}

export default Home;
