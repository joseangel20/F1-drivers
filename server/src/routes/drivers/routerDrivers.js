const {
  getDriversController,
  getDriverIdController,
  getDriversNamesController,
  postDriverController,
} = require("../../controllers/controllerDrivers");
const validatorCampos = require("../../utils/validateNewDriver");
const getDriversForClient = require("../../utils/detructuringDriversForClient");
const errorMessaage = "El conductor de coche no se encuentra";

const createDriver = async (req, res) => {
  const { id, name, lastName, description, image, nationality, dob, teams } =
    req.body;

  if (
    !id ||
    !name ||
    !lastName ||
    !description ||
    !image ||
    !nationality ||
    !dob ||
    !teams
  ) {
    return res
      .status(400)
      .send({ error: "Los datos enviados estan incompletos" });
  }

  try {
    const body = req.body;
    validatorCampos(body);
    const driver = await postDriverController(
      { id, name, lastName, description, image, nationality, dob },
      teams
    );

    res.status(200).send(driver);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getDriversNames = async (req, res) => {
  const query = req.query;
  try {
    const drivers = await getDriversNamesController(query);
    const driversForClient = getDriversForClient(drivers);
    res.status(200).send(driversForClient);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getDriverId = async (req, res) => {
  const { idDriver } = req.params;
  let driver;
  
  try {
    driver = await getDriverIdController(idDriver);

    const driversForClient = getDriversForClient(driver);
    res.status(200).send(driversForClient);
  } catch (error) {
    res.status(404).send({error:errorMessaage});
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await getDriversController();
    const driversForClient = getDriversForClient(drivers);
    res.status(200).send(driversForClient);
  } catch (error) {
    res.status(404).send({ error: errorMessaage });
  }
};

module.exports = { getDrivers, getDriverId, getDriversNames, createDriver };
