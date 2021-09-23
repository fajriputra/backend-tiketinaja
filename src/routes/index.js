const router = require("express").Router();

const movieRoutes = require("../modules/movie/movieRoutes");
const scheduleRoutes = require("../modules/schedule/scheduleRoutes");
const bookingRoutes = require("../modules/booking/bookingRoutes");

router.use("/movies", movieRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/booking", bookingRoutes);

module.exports = router;
