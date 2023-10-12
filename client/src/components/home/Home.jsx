import { setDriversAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./home.module.css";
import Card from "../card/Card";

const Home = () => {
  const allDrivers = useSelector((state) => state.allDrivers);
  const dispatch = useDispatch();

  useEffect(() => {
    async function axiosData() {
      const driversDispatch = await setDriversAction();
      driversDispatch(dispatch);
    }
    axiosData();
  }, [dispatch]);

  const ElementCard = allDrivers.map(({ id, name, image, teams }, index) => {
    if (!image.startsWith("https")) image = "data:image/jpeg;base64," + image;
    if (index < 9)
      return (
        <Card
          key={id + "-" + index}
          id={id}
          name={name}
          image={image}
          teams={teams}
        />
      );
  });

  return (
    <div className={styles.contents}>
      <div className={styles.contentsBody}>
        <div className={styles.sideOptions}>
          <div className={styles.header}>
            <h1>F1 Drivers</h1>
          </div>

          <h1>Options</h1>
        </div>

        <div className={styles.sideCards}>
          {ElementCard ? ElementCard : "holamundo"}
        </div>
      </div>
    </div>
  );
};

export default Home;
