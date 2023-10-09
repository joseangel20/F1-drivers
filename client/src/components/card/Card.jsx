/* eslint-disable react/prop-types */
function Card({name, image, teams }) {
  if (teams && teams.length > 14) teams = teams.substring(0,14) + " ...";
  else teams;

  return (
    <div>
      <h2>{name}</h2>
      <img src={image} width={200} height={192} />
      <p>{teams}</p>
    </div>
  );
}

export default Card;
