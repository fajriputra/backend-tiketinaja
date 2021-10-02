const router = require("express").Router();

const dashboardController = require("./dashboardController");
const middlewareAuth = require("../../middleware/auth");

router.get(
  "/",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  dashboardController.getDataDashboard
);

module.exports = router;
