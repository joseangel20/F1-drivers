const fs = require("fs");

const destructuringDriversForClient = (driver) => {
  console.log;
  const {
    id,
    name,
    lastName,
    nationality,
    image,
    description,
    dob,
    Teams,
    teams,
  } = driver;

  const bodyObj = {
    id,
    name,
    nationality,
    lastName,
    image,
    description,
    dob,
  };
  return { bodyObj, Teams };
};

const getDriversForClient = (drivers) => {
  return drivers.map((driver) => {
    const { bodyObj, Teams } = destructuringDriversForClient(driver);
    if (typeof bodyObj.name !== "string") {
      bodyObj.name = driver.name.forename;
      bodyObj.lastName = driver.name.surname;
      bodyObj.image = driver.image.url;
      bodyObj.teams = driver.teams;
    } else {
      const date = JSON.stringify(bodyObj.dob).substring(1, 11);
      bodyObj.dob = date;
      let teamsDbTeams = Teams.map((team) => {
        return team.name;
      });

      bodyObj.teams = teamsDbTeams.join(", ");
    }

    // Lee la imagen desde el sistema de archivos
    const imageBuffer = fs.readFileSync("public/anonimo.jpg");
    // Convierte la imagen en base64
    const base64Image = imageBuffer.toString("base64");

    if (!bodyObj.image) bodyObj.image = base64Image;
    return bodyObj;
  });
};

module.exports = getDriversForClient;
