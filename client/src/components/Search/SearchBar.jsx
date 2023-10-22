/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDriverNamesAction, filterAction } from "../../redux/actions";
import styles from "./searchBar.module.css";

export default function SearchBar({ axiosData, option }) {
  const dispatch = useDispatch();
  const [buscar, setBuscar] = useState("");

  const searchHandler = (e) => {
    const name = e.target.value;
    localStorage.setItem("name", name);
    setBuscar(name);
    axiosData(dispatch, getDriverNamesAction, name);
    option.setOptionFiilter({ ...option.optionFilter, team: "" });
    dispatch(filterAction(option.optionFilter.filter));
  };

  useEffect(() => {
    setBuscar(localStorage.name || buscar);
  }, [buscar]);

  return (
    <div className={styles.buscar}>
      <label htmlFor="buscar">Buscar por nombre:</label>
      <input
        id="buscar"
        name="buscar"
        type="text"
        onChange={searchHandler}
        value={buscar}
      />
    </div>
  );
}
