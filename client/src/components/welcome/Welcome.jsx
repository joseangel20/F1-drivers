import styles from "./welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.mensaje}>
        <h1>BIENVENIDO</h1>
        <p className={styles.first}>a drivers</p>
        <p className={styles.second}>Formula 1</p>
        <button>Entrar</button>
      </div>
    </div>
  );
};

export default Welcome;
