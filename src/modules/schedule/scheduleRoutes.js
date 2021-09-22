const router = require("express").Router();

const scheduleController = require("./scheduleController");

router.post("/", scheduleController.storeSchedule);
router.get("/", scheduleController.getSchedule);
router.get("/:id", scheduleController.getSingleSchedule);
router.patch("/:id", scheduleController.updateSchedule);
router.delete("/:id", scheduleController.deleteSchedule);

module.exports = router;
