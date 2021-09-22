const router = require("express").Router();

const movieRoutes = require("../modules/movie/movieRoutes");
const scheduleRoutes = require("../modules/schedule/scheduleRoutes");

router.use("/movies", movieRoutes);
router.use("/schedule", scheduleRoutes);

module.exports = router;
