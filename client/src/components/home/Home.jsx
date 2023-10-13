import { setDriversAction, setDriverNamesAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./home.module.css";
import Card from "../card/Card";
import SearchBar from "../Search/SearchBar";
import Filter from "../filter/Filter";

async function axiosData(dispatch, action, value) {
  const driversDispatch = await action(value);
  driversDispatch(dispatch);
}

const mapCardDrivers = (allDrivers) => {
  return allDrivers.map(({ id, name, image, teams }, index) => {
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
};

const Home = () => {
  const allDrivers = useSelector((state) => state.allDrivers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allDrivers.length == 0) axiosData(dispatch, setDriversAction);
  }, [dispatch]);

  const searchHandler = (e) => {
    const name = e.target.value;
    axiosData(dispatch, setDriverNamesAction, name);
  };

  const ElementCard = mapCardDrivers(allDrivers);
  return (
    <div className={styles.contents}>
      <div className={styles.contentsBody}>
        <div className={styles.sideOptions}>
          <SearchBar searchHandler={searchHandler} dispatch={dispatch} />
          <Filter />
        </div>

        <div className={styles.sideCards}>{ElementCard}</div>
      </div>
    </div>
  );
};

export default Home;
