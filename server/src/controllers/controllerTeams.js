const { Team } = require("../db");

const getTeamsController = async () => {
  const teams = await Team.findAll();
  return teams;
};

module.exports = getTeamsController;
