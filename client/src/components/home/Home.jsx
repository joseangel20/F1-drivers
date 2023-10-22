/* eslint-disable react-hooks/exhaustive-deps */
import { getDriverNamesAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import Filter from "../filter/Filter";
import Cards from "../cards/Cards";
import styles from "./home.module.css";

async function axiosData(dispatch, action, name) {
  try {
    const driversDispatch = await action(name);
    driversDispatch(dispatch);
  } catch (error) {
    console.error(error.message);
  }
}

window.addEventListener("unload", () => {
  localStorage.name = "";
  localStorage.team = "";
  localStorage.origin = "api";
  localStorage.filter = "name_asce";
});

const Home = () => {
  const allDrivers = useSelector((state) => state.driversReducer.filterDrivers);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    let { name } = localStorage;
    if (allDrivers.length === 0)
      axiosData(dispatch, getDriverNamesAction, name);
  }, [dispatch]);

  return (
    <div className={styles.contents}>
      <div className={styles.contentsBody}>
        <div className={styles.sideOptions}>
          <Filter updateHome={{ update, setUpdate }} axiosData={axiosData} />
        </div>

        <Cards allDrivers={allDrivers} />
      </div>
    </div>
  );
};

export default Home;
