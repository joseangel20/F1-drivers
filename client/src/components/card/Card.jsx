/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./card.module.css";

function Card({ id, name, image, teams }) {

  const navigate = useNavigate();

  const handlerDetail = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className={styles.contents} onClick={handlerDetail}>
      <h2>{name}</h2>
      <img src={image} />
      <p>{teams}</p>
    </div>
  );
}

export default Card;
