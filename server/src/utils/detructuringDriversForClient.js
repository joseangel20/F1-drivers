const fs = require("fs");

const destructuringDriversForClient = (driver) => {
  const { id, name, lastName, nationality, image, description, dob, Teams } =
    driver;

  // devuelvo un objeto común para cada caso sea de la api o dataBase
  const bodyResponse = {
    id,
    name,
    nationality,
    lastName,
    image,
    description,
    dob,
  };
  return { bodyResponse, Teams };
};

const getDriversForClient = (drivers) => {
  return drivers.map((driver) => {
    const { bodyResponse, Teams } = destructuringDriversForClient(driver);
    if (typeof bodyResponse.name !== "string") {
      bodyResponse.name = driver.name.forename;
      bodyResponse.lastName = driver.name.surname;
      bodyResponse.image = driver.image.url;
      // agregando un espacio a los teams que no tienen para no romper la ui
      if (driver.teams) bodyResponse.teams = driver.teams.split(",").join(", ");
    } else {
      //Parseo el objeto date en un objecto json para obtener solo la fecha
      const date = JSON.stringify(bodyResponse.dob).substring(1, 11);
      bodyResponse.dob = date;

      let teamsDbTeams = Teams.map((team) => {
        return team.name;
      });

      bodyResponse.teams = teamsDbTeams.join(", ");
    }

    // Lee la imagen desde el sistema de archivos
    const imageBuffer = fs.readFileSync("public/anonimo.jpg");
    // Convierte la imagen en base64
    const base64Image = imageBuffer.toString("base64");

    if (!bodyResponse.image) bodyResponse.image = base64Image;
    return bodyResponse;
  });
};

module.exports = getDriversForClient;
