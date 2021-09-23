const router = require("express").Router();

const bookingController = require("./bookingController");

router.post("/", bookingController.storeBooking);

module.exports = router;
