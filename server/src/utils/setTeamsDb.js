const { Team } = require("../db");

const setTeamsDb = async (axios) => {
  // Se crea una estructura Set para almacenar los nombres de los teams
  // sin duplicados

  const teamsDb = await Team.findAll();
  if (teamsDb.length != 0) return;
  
  //estrucura Set
  const teams = new Set();
  
  //consulta a la api de drivers
  axios("http://localhost:5000/drivers").then(({ data }) => {
    data.forEach((driver) => {
      if (driver.teams !== undefined) {
        if (driver.teams.includes(",")) {
          driver.teams.split(",").forEach((team) => {
            //se agregan los teams en el set para no tener datos duplicados
            teams.add(team.trim());
          });
        } else {
          teams.add(driver.teams.trim());
        }
      }
    });

    teams.forEach((name) => {
      Team.create({ name });
    });
  });
};

module.exports = setTeamsDb;
