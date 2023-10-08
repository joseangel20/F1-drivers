const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const setTeamsDb = require("./src/utils/setTeamsDb");
const PORT = 3001;

conn
  .sync({ force: false })
  .then(() => {
    
    // Se carga los datos de teams en la base de datos Team si esta esta vacia 
    setTeamsDb(axios);

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
