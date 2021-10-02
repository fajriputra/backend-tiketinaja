const router = require("express").Router();

const bookingController = require("./bookingController");

router.post("/", bookingController.storeBooking);
router.get("/seat", bookingController.getAllSeatBooking);
router.get("/:id", bookingController.getBookingById);
router.get("/user-id/:userId", bookingController.getBookingByUserId);
router.get("/status-ticket/:id", bookingController.getStatusTicket);

module.exports = router;
