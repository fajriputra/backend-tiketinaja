/* eslint-disable no-restricted-syntax */
const helpersWrapper = require("../../helpers/wrapper");
const dashboardModel = require("./dashboardModel");

module.exports = {
  getDataDashboard: async (req, res) => {
    try {
      const { movieId, location, premier } = req.query;

      if (!movieId || !location || !premier) {
        return helpersWrapper.response(res, 404, "Select filter first", []);
      }

      const listMonth = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const result = await dashboardModel.getDataDashboard(
        movieId,
        location,
        premier
      );

      const newResult = [];
      // console.log(result, "resulttttttttttttttttt");
      for (const i of listMonth) {
        // console.log(listMonth, "list monttttttttttttt");
        let test = 0;
        for (const j of result) {
          // console.log(j, "manipulllllllllllllllllllllll");
          if (i === j.month) {
            test += 1;
            console.log(test, j.month);
            newResult.push({ month: j.month, total: j.total });
          }
        }

        if (test === 0) {
          newResult.push({ month: i, total: 0 });
        }
      }
      // console.log(newResult);

      if (!result.length) {
        return helpersWrapper.response(
          res,
          404,
          "Data statistic you are looking for was not found",
          []
        );
      }

      return helpersWrapper.response(res, 200, "Success get data", newResult);
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
