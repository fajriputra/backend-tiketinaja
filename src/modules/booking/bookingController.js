const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const bookingModel = require("./bookingModel");
const scheduleModel = require("../schedule/scheduleModel");
const helpersWrapper = require("../../helpers/wrapper");
const midtrans = require("../../helpers/midtrans");

module.exports = {
  storeBooking: async (req, res) => {
    try {
      const {
        dateBooking,
        timeBooking,
        movieId,
        scheduleId,
        seat: totalTicket,
      } = req.body;

      const { id } = req.decodeToken;

      const schedule = await scheduleModel.getSingleSchedule(scheduleId);

      const data = {
        id: uuidv4(),
        userId: id,
        dateBooking,
        movieId,
        timeBooking,
        scheduleId,
        totalTicket,
        totalPayment: schedule[0].price * totalTicket.length,
        paymentMethod: "",
        urlRedirect: "",
        statusPayment: "pending",
      };

      const dataa = { ...data, totalTicket: totalTicket.length };

      const result = await bookingModel.storeBooking(dataa);

      totalTicket.forEach(async (ele) => {
        const setData = {
          bookingId: result.id,
          scheduleId,
          movieId,
          dateSchedule: dateBooking,
          timeSchedule: timeBooking,
          seat: ele,
        };
        await bookingModel.storeBookingSeat(setData);
      });

      const resultMidtrans = await midtrans.postMidtrans(
        result.id,
        result.totalPayment
      );

      await bookingModel.updateBooking(
        { urlRedirect: resultMidtrans },
        result.id
      );

      return helpersWrapper.response(res, 200, "Success create booking", {
        ...result,
        urlRedirect: resultMidtrans,
      });
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
  midtransNotif: async (req, res) => {
    try {
      const result = await midtrans.midtransNotification(req.body);
      const {
        order_id: bookingId,
        transaction_status: transactionStatus,
        fraud_status: fraudStatus,
      } = result;

      if (transactionStatus === "capture") {
        // capture only applies to card transaction, which you need to check for the fraudStatus
        if (fraudStatus === "challenge") {
          // TODO set transaction status on your databaase to 'challenge'
        } else if (fraudStatus === "accept") {
          // TODO set transaction status on your databaase to 'success'
          // [1]
          const setData = {
            paymentMethod: result.payment_type,
            statusPayment: "success",
            statusTicket: "Active",
            updatedAt: new Date(Date.now()),
          };
          await bookingModel.updateBooking(setData, bookingId);
        }
      } else if (transactionStatus === "settlement") {
        // TODO set transaction status on your databaase to 'success'
        // [1]
        const setData = {
          paymentMethod: result.payment_type,
          statusPayment: "success",
          statusTicket: "Active",
          updatedAt: new Date(Date.now()),
        };

        await bookingModel.updateBooking(setData, bookingId);
      } else if (transactionStatus === "deny") {
        // TODO you can ignore 'deny', because most of the time it allows payment retries
        // and later can become success
      } else if (
        transactionStatus === "cancel" ||
        transactionStatus === "expire"
      ) {
        // TODO set transaction status on your databaase to 'failure'
        // [1]
        const setData = {
          paymentMethod: result.payment_type,
          statusPayment: "failed",
          statusTicket: "notActive",
          updatedAt: new Date(Date.now()),
        };

        await bookingModel.updateBooking(setData, bookingId);
      } else if (transactionStatus === "pending") {
        // TODO set transaction status on your databaase to 'pending' / waiting payment
      }
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
  getAllSeatBooking: async (req, res) => {
    try {
      const { scheduleId, movieId, dateSchedule, timeSchedule } = req.query;

      const result = await bookingModel.getAllSeatBooking(
        scheduleId,
        movieId,
        dateSchedule,
        timeSchedule
      );

      if (!result.length) {
        return helpersWrapper.response(
          res,
          200,
          "Data yang kamu cari tidak ditemukan",
          []
        );
      }

      return helpersWrapper.response(res, 200, "Success getting data", result);
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await bookingModel.getBookingById(id);

      if (!result.length) {
        return helpersWrapper.response(
          res,
          200,
          `Data by id : ${id} tidak ditemukan`,
          []
        );
      }

      const seat = result.map((item) => item.seat);

      const newResult = { ...result[0], seat };

      return helpersWrapper.response(res, 200, "success get data", newResult);
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
  getBookingByUserId: async (req, res) => {
    try {
      const { id } = req.params;

      const result = await bookingModel.getBookingByUserId(id);

      if (!result) {
        return helpersWrapper.response(
          res,
          400,
          `Data by id : ${id} tidak ditemukan`,
          []
        );
      }

      const tampung = [];
      result.forEach((item) => {
        const existing = tampung.filter(
          (item2) => item2.scheduleId === item.scheduleId
        );
        if (existing.length) {
          const existingIndex = tampung.indexOf(existing[0]);
          tampung[existingIndex].seat = tampung[existingIndex].seat.concat(
            item.seat
          );
        } else {
          // eslint-disable-next-line no-param-reassign
          if (typeof item.seat === "string") item.seat = [item.seat];
          tampung.push(item);
        }
      });

      return helpersWrapper.response(res, 200, "success get data", tampung);
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
  getStatusTicket: async (req, res) => {
    try {
      const { id } = req.params;

      const checkTicket = await bookingModel.getBookingById(id);
      if (!checkTicket.length) {
        return helpersWrapper.response(res, 200, "Data tidak ditemukan", []);
      }

      if (checkTicket[0].statusTicket !== "Active") {
        return helpersWrapper.response(res, 400, "Ticket already used", null);
      }

      await bookingModel.getStatusTicket("notActive", id);

      return helpersWrapper.response(res, 200, "Success use ticket");
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
  exportTicket: async (req, res) => {
    try {
      const { id } = req.params;
      const { firstName, lastName } = req.decodeToken;

      const fileName = `ticket-${id}.pdf`;
      const booking = await bookingModel.exportTicket(id);

      const bookingSeat = booking.map((item) => item.seat);

      const tampung = [];
      booking.map((item) => {
        const newData = {
          ...item,
          user: `${firstName} ${lastName}`,
          dateBooking: moment(item.dateBooking).format("DD MMM"),
          timeBooking: moment(item.timeBooking, ["HH:mm"]).format("LT"),
          seat: bookingSeat,
          link: `${process.env.BACKEND_URL}/status-ticket/${item.bookingId}`,
        };
        tampung.push(newData);
      });

      const newTampungData = tampung[0];

      ejs.renderFile(
        path.resolve("./src/templates/pdf/index.ejs"),
        { newTampungData },
        (error, result) => {
          if (!error) {
            const options = {
              height: "11.25in",
              width: "8.5in",
            };
            pdf
              .create(result, options)
              .toFile(path.resolve(`./public/generate/${fileName}`), (err) => {
                if (err) {
                  return helpersWrapper.response(res, 400, error.message, null);
                }
                return helpersWrapper.response(
                  res,
                  200,
                  "Success export ticket",
                  {
                    url: `${process.env.BACKEND_URL}/generate/${fileName}`,
                  }
                );
              });
          }
        }
      );
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
};
