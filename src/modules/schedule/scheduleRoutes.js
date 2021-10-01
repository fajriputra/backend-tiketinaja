const router = require("express").Router();

const scheduleController = require("./scheduleController");
const middlewareAuth = require("../../middleware/auth");
const middlewareRedis = require("../../middleware/redis");

router.post(
  "/",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearScheduleRedis,
  scheduleController.storeSchedule
);
router.get(
  "/",
  middlewareAuth.authentication,
  middlewareRedis.getScheduleRedis,
  scheduleController.getSchedule
);
router.get(
  "/:id",
  middlewareAuth.authentication,
  middlewareRedis.getScheduleByIdRedis,
  scheduleController.getSingleSchedule
);
router.patch(
  "/:id",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearScheduleRedis,
  scheduleController.updateSchedule
);
router.delete(
  "/:id",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  middlewareRedis.clearScheduleRedis,
  scheduleController.deleteSchedule
);

module.exports = router;
