const router = require("express").Router();

const movieRoutes = require("../modules/movie/movieRoutes");
const scheduleRoutes = require("../modules/schedule/scheduleRoutes");
const bookingRoutes = require("../modules/booking/bookingRoutes");
const authRoutes = require("../modules/auth/authRoutes");
const userRoutes = require("../modules/user/userRoutes");
const dashboardRoutes = require("../modules/dashboard/dashboardRoutes");

router.use("/movies", movieRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/booking", bookingRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
