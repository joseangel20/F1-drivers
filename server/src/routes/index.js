const { Router } = require("express");
const {
  getDrivers,
  getDriverId,
  getDriversNames,
  createDriver,
} = require("./drivers/routerDrivers");
const getTeams = require("./teams/routerTeams");

const router = Router();

// router drivers
router.get("/drivers", getDrivers);
router.get("/drivers/name?", getDriversNames);
router.get("/drivers/:idDriver", getDriverId);
router.post("/drivers", createDriver);

// router teams
router.get("/teams", getTeams);
module.exports = router;
