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
};
