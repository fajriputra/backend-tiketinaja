const connection = require("../../config/database");

module.exports = {
  getDataDashboard: () =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT MONTH(createdAt) AS month, SUM(totalPayment) AS total FROM booking WHERE YEAR(createdAt) = YEAR(NOW()) GROUP BY MONTH(createdAt)",
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
