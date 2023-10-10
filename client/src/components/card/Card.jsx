/* eslint-disable react/prop-types */
import styles from "./card.module.css"

function Card({name, image, teams }) {
  // if (teams && teams.length > 14) teams = teams.substring(0,18) + " ...";
  // else teams;

  return (
    <div className={styles.contents}>
      <h2>{name}</h2>
      <img src={image}/>
      <p>{teams}</p>
    </div>
  );
}

export default Card;
