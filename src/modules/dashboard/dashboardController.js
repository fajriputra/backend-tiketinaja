const helpersWrapper = require("../../helpers/wrapper");
const dashboardModel = require("./dashboardModel");

module.exports = {
  getDataDashboard: async (req, res) => {
    try {
      const { movieId, location, premier } = req.query;

      const result = await dashboardModel.getDataDashboard(
        movieId,
        location,
        premier
      );

      if (!result.length) {
        return helpersWrapper.response(
          res,
          404,
          "Data yang kamu cari tidak ditemukan"
        );
      }

      return helpersWrapper.response(res, 200, "Success get data", result);
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
