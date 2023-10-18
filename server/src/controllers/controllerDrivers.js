const axios = require("axios");
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");

const postDriverController = async (objDriver, teams) => {
  const driver = await Driver.create(objDriver);
  if (Array.isArray(teams)) {
    teams.forEach((team) => {
      driver.addTeams(team);
    });
  } else driver.addTeams(teams);

  return driver;
};

const getDriversNamesController = async (query) => {
  //Se combierte a minuscula para el match
  const nameQuery = query.name.toLowerCase();

  let apiDriversDbData = await axios("http://localhost:5000/drivers");

  const apiDriversDb = apiDriversDbData.data.filter((driver) => {
    let name = driver.name.forename.toLowerCase();
    if (name.startsWith(nameQuery)) return driver;
  });

  const driversDb = await Driver.findAll({
    where: {
      name: {
        [Op.iLike]: nameQuery + "%",
      },
    },
    include: Team,
  });

  const drivers = [...apiDriversDb, ...driversDb];

  // if (drivers.length == 0)
  //   throw new DriversError(
  //     `No se encontrarón conductores llamado [${query.name}]`
  //   );

  return drivers;
};

const getDriverIdController = async (idDriver) => {
  //cantidad de conductores en la api
  const numberDriversDb = await Driver.findAll();
  const numberDrivers = 508;

  // if (+idDriver <= 0 || +idDriver > numberDrivers + numberDriversDb)
  //   throw new DriversError(errorMessaage);

  if (+idDriver>= 0 && +idDriver <= numberDrivers) {
    const apiDriversDb = await axios(
      `http://localhost:5000/drivers/${idDriver}`
    );
    return [apiDriversDb.data];
  }

  const driverDb = await Driver.findOne({
    where: { id: +idDriver },
    include: Team,
  });
  return [driverDb];
};

const getDriversController = async () => {
  const apiDriversDb = await axios("http://localhost:5000/drivers");
  const driversDb = await Driver.findAll({ include: "Teams" });
  if (driversDb.length > 0) return [...apiDriversDb.data, ...driversDb];
  return apiDriversDb.data;
};

module.exports = {
  getDriversController,
  getDriverIdController,
  getDriversNamesController,
  postDriverController,
};
