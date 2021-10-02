const connection = require("../../config/database");

module.exports = {
  getDataDashboard: (movieId, location, premier) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT MONTHNAME(b.createdAt) AS month, SUM(b.totalPayment) AS total FROM booking AS b JOIN schedule AS s WHERE YEAR(s.createdAt) = YEAR(NOW()) AND s.movieId = "${movieId}" AND s.location = "${location}" AND s.premier = "${premier}" GROUP BY MONTHNAME(b.createdAt)`,
        (error, result) => {
          const newResult = result.map((item) => {
            const convertMonth = {
              ...item,
              month: item.month.slice(0, 3),
            };
            return convertMonth;
          });

          if (!error) {
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
};
