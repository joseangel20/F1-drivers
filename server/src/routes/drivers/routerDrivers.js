const {
  getDriversController,
  getDriverIdController,
  getDriversNamesController,
  postDriverController,
} = require("../../controllers/controllerDrivers");

const validatorCampos = ({
  id,
  name,
  lastName,
  descripcion,
  image,
  nacionalidad,
  birth,
  team,
}) => {
  if (isNaN(Number(id)) && id > 508)
    throw new TypeError("El [id] debe ser un valor númerico mayor a 508");
  if (typeof name !== "string")
    throw new TypeError("El [name] debe ser un valor string");
  if (typeof lastName !== "string")
    throw new TypeError("El [lastName] debe ser un valor string");
  if (typeof descripcion !== "string")
    throw new TypeError("La [descripcion] debe ser un valor string");
  if (typeof image !== "string")
    throw new TypeError("La [image] debe ser un valor string");
  if (typeof nacionalidad !== "string")
    throw new TypeError("La [nacionalidad] debe ser un valor string");
  const fecha = new Date(birth);
  if (isNaN(fecha) || fecha === fecha.toLocaleDateString())
    throw new TypeError(
      "El [birth] debe ser un valor string ejemplo [1900-11-26]"
    );

  if (typeof team !== "number")
    throw new TypeError("El [team] debe ser un valor númerico");

  return fecha;
};

const createDriver = async (req, res) => {
  const { id, name, lastName, descripcion, image, nacionalidad, birth, team } =
    req.body;

  if (
    !id ||
    !name ||
    !lastName ||
    !descripcion ||
    !image ||
    !nacionalidad ||
    !birth ||
    !team
  ) {
    return res
      .status(400)
      .send({ error: "Los datos enviados estan incompletos" });
  }

  try {
    const body = req.body;
    fecha = validatorCampos(body);

    const driver = await postDriverController(
      { id, name, lastName, descripcion, image, nacionalidad, birth: fecha },
      team
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
    res.status(200).send(drivers);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getDriverId = async (req, res) => {
  const { idDriver } = req.params;
  let driver;
  try {
    if (idDriver) driver = await getDriverIdController(idDriver);
    else driver = await getDriverIdController();
    res.status(200).send(driver);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await getDriversController();
    res.status(200).send(drivers);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = { getDrivers, getDriverId, getDriversNames, createDriver };
