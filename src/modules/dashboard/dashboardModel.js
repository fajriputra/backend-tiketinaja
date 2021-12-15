const connection = require("../../config/database");

module.exports = {
  getDataDashboard: (movieId, location, premier) =>
    new Promise((resolve, reject) => {
      const query = connection.query(
        `SELECT MONTHNAME(b.createdAt) AS month, SUM(b.totalPayment) AS total FROM booking AS b JOIN schedule AS s ON b.scheduleId = s.id WHERE YEAR(s.createdAt) = YEAR(NOW()) AND b.movieId = "${movieId}" AND s.location = "${location}" AND s.premier = "${premier}" GROUP BY MONTHNAME(b.createdAt)`,
        (error, result) => {
          const newResult = result.map((item) => {
            const sliceMonth = {
              ...item,
              month: item.month.slice(0, 3),
            };
            return sliceMonth;
          });

          if (!error) {
            resolve(newResult);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
      console.log(query.sql);
    }),
};
