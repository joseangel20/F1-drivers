/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setDriverAction, cleanDriverAction } from "../../redux/actions";
import styles from "./detail.module.css";
import { Link } from "react-router-dom";

const Detail = () => {
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.driver);
  const { id } = useParams();
  let image = "";

  useEffect(() => {
    setDriverAction(id).then((driverDispatch) => {
      driverDispatch(dispatch);
    });

    return () => {
      dispatch(cleanDriverAction());
    };
  }, [id, dispatch]);

  if (!driver.name)
    return (
      <div className={styles.contentsDetail}>
        <div className={styles.contents}>
          <h1 className={styles.notFound}>No hay conductor con id: {id}</h1>
        </div>
      </div>
    );
    
  if (driver.image !== undefined) {
    image = driver.image
    if (!driver.image.startsWith("https"))
      image = "data:image/jpeg;base64," + driver.image;
  }

  return (
    <div className={styles.contentsDetail}>
      <div className={styles.contents}>
        <div className={styles.sideImageName}>
          <img src={image} alt="conductor" />
          <div>
            <h1>{id}</h1>
            <h2>{` ${driver.lastName} ${driver.nationality}`}</h2>
          </div>
          <Link to="/home">
            <button className={styles.button}>Home</button>
          </Link>
        </div>
        <div className={styles.sideDetail}>
          <p>
            <span>Nacionalidad:</span> {driver.nationality}
          </p>
          <p>
            <span>Fecha Nacimiento:</span> {driver.dob}
          </p>
          <p>
            <span>Escuderías:</span> {driver.teams}
          </p>
          <p>
            <span>Descripción:</span> {driver.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
