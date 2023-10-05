const axios = require("axios");
const { Team } = require("./src/db");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    const teams = new Set();
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

      teams.forEach(name=>{
        Team.create({name})
      })
    });

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
