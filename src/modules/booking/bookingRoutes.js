const router = require("express").Router();

const bookingController = require("./bookingController");

router.post("/", bookingController.storeBooking);
router.get("/seat", bookingController.getAllSeatBooking);
router.get("/:id", bookingController.getBookingById);
router.get("/user-id/:userId", bookingController.getBookingByUserId);

module.exports = router;
