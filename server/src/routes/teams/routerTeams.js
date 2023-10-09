const getTeamsController = require("../../controllers/controllerTeams");

const getTeams = async (req, res) => {
  try {
    const teams = await getTeamsController();

    res.status(200).send(teams);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};

module.exports = getTeams;
