const axios = require("axios");
const { Driver, Team } = require("../db");
const { Op, EmptyResultError } = require("sequelize");

const errorMessaage = "El conductor de coche no se encuentra";

const postDriverController = async (objDriver, team) => {
  const driver = await Driver.create(objDriver);
  driver.addTeams(team);

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
        [Op.iLike]: query.name,
      },
    },
  });

  const drivers = [...driversDb, ...apiDriversDb];

  if (drivers.length == 0)
    throw new EmptyResultError(
      `No se encontrarón conductores llamado [${query.name}]`
    );

  return drivers;
};

const getDriverIdController = async (idDriver) => {
  //cantidad de conductores en la api
  const numberDrivers = 508;

  try {
    if (+idDriver <= numberDrivers) {
      const apiDriversDb = await axios(
        `http://localhost:5000/drivers/${idDriver}`
      );
      return apiDriversDb.data;
    }
  } catch (error) {
    throw new EmptyResultError(errorMessaage);
  }

  const driverDb = await Driver.findOne({
    where: { id: +idDriver },
    include: Team,
  });

  if (!driverDb) throw new EmptyResultError(errorMessaage);
  return driverDb;
};

const getDriversController = async () => {
  const apiDriversDb = await axios("http://localhost:5000/drivers");
  const driversDb = await Driver.findAll();
  if (driversDb.length > 0) return [...apiDriversDb.data, ...driversDb];
  return apiDriversDb.data;
};

module.exports = {
  getDriversController,
  getDriverIdController,
  getDriversNamesController,
  postDriverController,
};
