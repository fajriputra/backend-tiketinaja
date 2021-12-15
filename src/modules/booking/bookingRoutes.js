const router = require("express").Router();

const bookingController = require("./bookingController");
const middlewareAuth = require("../../middleware/auth");

router.post("/", middlewareAuth.authentication, bookingController.storeBooking);
router.post("/midtrans-notification", bookingController.midtransNotif);
router.get("/seat", bookingController.getAllSeatBooking);
router.get("/:id", bookingController.getBookingById);
router.get("/user-id/:id", bookingController.getBookingByUserId);
router.get(
  "/status-ticket/:id",
  middlewareAuth.authentication,
  middlewareAuth.isAdmin,
  bookingController.getStatusTicket
);
router.get(
  "/export-ticket/:id",
  middlewareAuth.authentication,
  bookingController.exportTicket
);

module.exports = router;
