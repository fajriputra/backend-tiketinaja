const connection = require("../../config/database");

module.exports = {
  storeBooking: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO booking SET ?", data, (error, result) => {
        const newResult = {
          id: result.insertId,
          ...data,
        };

        if (!error) {
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  storeBookingSeat: (data) =>
    new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO bookingseat SET ?",
        data,
        (error, result) => {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          if (!error) {
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getPrice: (scheduleId) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT price FROM schedule WHERE id = ${scheduleId}`,
        (error, result) => {
          if (!error) {
            resolve(result[0].price);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getAllSeatBooking: (scheduleId, movieId, dateSchedule, timeSchedule) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT id, seat FROM bookingseat WHERE scheduleId = "${scheduleId}" AND movieId = "${movieId}" AND dateSchedule = "${dateSchedule}" AND timeSchedule = "${timeSchedule}"`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getBookingById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT b.id, b.userId, b.dateBooking, b.timeBooking, b.movieId, b.scheduleId, b.totalTicket, b.totalPayment, b.paymentMethod, b.statusPayment, bs.seat FROM booking AS b JOIN bookingseat AS bs ON b.id = bs.bookingId WHERE b.id = ${id}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getBookingByUserId: (userId) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT b.id, b.userId, b.dateBooking, b.timeBooking, b.movieId, b.scheduleId, b.totalTicket, b.totalPayment, b.paymentMethod, b.statusPayment, bs.seat FROM booking AS b JOIN bookingseat AS bs ON b.id = bs.bookingId WHERE b.userId = ${userId}`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};