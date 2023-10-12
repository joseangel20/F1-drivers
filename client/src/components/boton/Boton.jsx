/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Boton(props) {
  return (
    <>
      <Link to="/home">
        <button className={props.clase}>Entrar</button>
      </Link>
    </>
  );
}

export default Boton;
