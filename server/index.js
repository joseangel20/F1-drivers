const axios = require("axios");
const { Team } = require("./src/db");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn
  .sync({ force: false })
  .then(() => {
    // Se crea una estructura Set para almacenar los nombres de los teams
    // sin duplicados
    const teams = new Set();

    //consulta a la api de drivers
    axios("http://localhost:5000/drivers").then(({ data }) => {
      data.forEach((driver) => {
        if (driver.teams !== undefined) {
          if (driver.teams.includes(",")) {
            driver.teams.split(",").forEach((team) => {
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

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
