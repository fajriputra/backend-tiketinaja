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
  getAllFilter: (scheduleId) =>
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
  // getSeatBookingId: (scheduleId) =>
  //   new Promise((resolve, reject) => {
  //     connection.query(
  //       `SELECT price FROM schedule WHERE id = ${scheduleId}`,
  //       (error, result) => {
  //         if (!error) {
  //           resolve(result[0].price);
  //         } else {
  //           reject(new Error(`SQL : ${error.sqlMessage}`));
  //         }
  //       }
  //     );
  //   }),
};

// getSingleBooking: (id) =>
//   new Promise((resolve, reject) => {
//     connection.query(
//       "SELECT * FROM booking WHERE id = ?",
//       id,
//       (error, result) => {
//         if (!error) {
//           resolve(result);
//         } else {
//           reject(new Error(`SQL : ${error.sqlMessage}`));
//         }
//       }
//     );
//   }),
// updateBooking: (data, id) =>
//   new Promise((resolve, reject) => {
//     connection.query(
//       "UPDATE booking SET ? WHERE id = ?",
//       [data, id],
//       (error) => {
//         const newResult = {
//           id,
//           ...data,
//         };
//         if (!error) {
//           resolve(newResult);
//         } else {
//           reject(new Error(`SQL : ${error.sqlMessage}`));
//         }
//       }
//     );
//   }),
// deleteBooking: (id) =>
//   new Promise((resolve, reject) => {
//     connection.query("DELETE FROM booking WHERE id = ?", id, (error) => {
//       if (!error) {
//         resolve(id);
//       } else {
//         reject(new Error(`SQL : ${error.sqlMessage}`));
//       }
//     });
//   }),
