const { Router } = require("express");
const {
  getDrivers,
  getDriverId,
  getDriversNames,
  createDriver,
} = require("./drivers/routerDrivers");

const router = Router();

router.get("/drivers", getDrivers);
router.get("/drivers/name?", getDriversNames);
router.get("/drivers/:idDriver", getDriverId);
router.post("/drivers", createDriver);
module.exports = router;
