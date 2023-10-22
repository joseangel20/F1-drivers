/* eslint-disable react/prop-types */
import styles from "./cards.module.css";
import Card from "../card/Card";

const mapCardDrivers = (allDrivers) => {
  return allDrivers.map(({ id, name, image, teams }, index) => {
    if (!image.startsWith("https")) image = "data:image/jpeg;base64," + image;

    if (index < 9) {
      return (
        <Card
          key={id + "-" + index}
          id={id}
          name={name}
          image={image}
          teams={teams}
        />
      );
    }
  });
};

export default function Cards({ allDrivers }) {
  return <div className={styles.sideCards}>{mapCardDrivers(allDrivers)}</div>;
}
