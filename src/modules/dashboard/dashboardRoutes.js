const router = require("express").Router();

const dashboardController = require("./dashboardController");

router.get("/", dashboardController.getDataDashboard);

module.exports = router;
