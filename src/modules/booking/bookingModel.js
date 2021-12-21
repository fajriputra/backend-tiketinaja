const connection = require("../../config/database");

module.exports = {
  storeBooking: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO booking SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
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
        `SELECT b.id, b.userId, b.dateBooking, b.timeBooking, b.movieId, b.scheduleId, b.totalTicket, b.totalPayment, b.paymentMethod, b.statusPayment, bs.seat, m.name, s.premier FROM booking AS b JOIN bookingseat AS bs ON b.id = bs.bookingId JOIN movie AS m ON b.movieId = m.id JOIN schedule AS s ON b.scheduleId = s.id WHERE b.id = "${id}"`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getBookingByUserId: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT b.id, b.userId, b.dateBooking, b.timeBooking, b.movieId, b.scheduleId, b.totalTicket, b.totalPayment, b.paymentMethod, b.statusPayment, b.statusTicket,  bs.seat, movie.name, schedule.premier FROM booking AS b JOIN bookingseat AS bs ON b.id = bs.bookingId JOIN movie ON b.movieId = movie.id JOIN schedule ON b.scheduleId = schedule.id WHERE b.userId = "${id}"`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  updateBooking: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE booking SET ? WHERE id = ?",
        [data, id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getStatusTicket: (data, id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "UPDATE booking SET statusTicket = ? WHERE id = ?",
        [data, id],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  exportTicket: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT userId, bookingId, dateBooking, timeBooking, totalTicket, totalPayment, paymentMethod, statusPayment, seat, name  FROM booking AS b JOIN bookingseat AS bs ON b.id = bs.bookingId JOIN movie AS mv ON mv.id= b.movieId WHERE b.id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`Message : ${error.message}`));
          }
        }
      );
    }),
};
