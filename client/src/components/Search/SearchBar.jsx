/* eslint-disable react/prop-types */
// import { useEffect, useRef } from "react";
import styles from "./searchBar.module.css";
export default function SearchBar({ searchHandler, buscar }) {
  //   const buscar = useRef(null);

  return (
    <div className={styles.buscar}>
      <label htmlFor="buscar">Buscar por nombre:</label>
      <input
        id="buscar"
        name="buscar"
        type="text"
        onChange={searchHandler}
        ref={buscar}
      />
    </div>
  );
}
