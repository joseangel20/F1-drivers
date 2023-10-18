import { setDriversAction, setDriverNamesAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./home.module.css";
import SearchBar from "../Search/SearchBar";
import Filter from "../filter/Filter";
import Cards from "../cards/Cards";

async function axiosData(dispatch, action, value) {
  try {
    const driversDispatch = await action(value);
    driversDispatch(dispatch);
  } catch (error) {
    console.error(error.message);
  }
}

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
  
  return (
    <div className={styles.contents}>
      <div className={styles.contentsBody}>
        <div className={styles.sideOptions}>
          <SearchBar searchHandler={searchHandler} dispatch={dispatch} />
          <Filter />
        </div>

        <Cards allDrivers={allDrivers} />
      </div>
    </div>
  );
};

export default Home;
