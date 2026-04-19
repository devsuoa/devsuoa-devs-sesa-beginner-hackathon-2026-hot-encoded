import { useEffect } from 'react';
import { Link } from 'react-router';
import { useAppContext } from '../../context/AppContext';
import styles from "./Home.module.css";

function Home() {
  const { clearPreferences } = useAppContext();

  // Reset all user data when returning to the home page
  useEffect(() => {
    clearPreferences();
  }, []);

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
