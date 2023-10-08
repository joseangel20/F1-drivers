const getTeamsController = require("../../controllers/controllerTeams");

const getTeams = async(req, res)=>{
    const teams = await getTeamsController();
    return teams;
}

module.exports = getTeams;