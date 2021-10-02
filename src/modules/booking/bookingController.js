const bookingModel = require("./bookingModel");
const helpersWrapper = require("../../helpers/wrapper");

module.exports = {
  storeBooking: async (req, res) => {
    try {
      const {
        userId,
        dateBooking,
        timeBooking,
        movieId,
        scheduleId,
        seat: totalTicket,
        paymentMethod,
        statusPayment,
      } = req.body;

      const findPrice = await bookingModel.getPrice(scheduleId);

      const data = {
        userId,
        dateBooking,
        timeBooking,
        movieId,
        scheduleId,
        totalTicket,
        totalPayment: findPrice * totalTicket.length,
        paymentMethod,
        statusPayment,
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

      return helpersWrapper.response(
        res,
        200,
        "Success create booking",
        result
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
          404,
          "Data yang kamu cari tidak ditemukan",
          null
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
          404,
          `Data by id : ${id} tidak ditemukan`,
          null
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
      const { userId } = req.params;

      const result = await bookingModel.getBookingByUserId(userId);

      if (!result) {
        return helpersWrapper.response(
          res,
          404,
          `Data by id : ${userId} tidak ditemukan`,
          null
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

      const status = "Ticket used";
      const result = await bookingModel.getStatusTicket(status, id);

      return helpersWrapper.response(res, 200, "Ticket already used", result);
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
