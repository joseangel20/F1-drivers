import styles from "./welcome.module.css";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.mensaje}>
        <h1 className={styles.text}>BIENVENIDO</h1>
        <p className={styles.first}>a drivers</p>
        <p className={styles.second}>Formula 1</p>
        <Link to="/home">
          <button className={styles.button}>Entrar</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
