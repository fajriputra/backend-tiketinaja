const scheduleModel = require("./scheduleModel");
const helpersWrapper = require("../../helpers/wrapper");

module.exports = {
  storeSchedule: async (req, res) => {
    try {
      const { movieId, premier, price, location, dateStart, dateEnd, time } =
        req.body;

      const data = {
        movieId,
        premier,
        price,
        location,
        dateStart,
        dateEnd,
        time: JSON.parse(time).join(", "),
      };

      const result = await scheduleModel.storeSchedule(data);

      return helpersWrapper.response(
        res,
        200,
        "Success create schedule",
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
  getSchedule: async (req, res) => {
    try {
      // eslint-disable-next-line prefer-const
      let { page, limit, movieId, location, sortType } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 3;
      movieId = movieId || "";
      location = location || "";
      sortType = sortType || "asc";

      let offset = page * limit - limit;

      const totalData = await scheduleModel.getCountSchedule();
      const totalPage = Math.ceil(totalData / limit);

      if (totalPage < page) {
        offset = 0;
        page = 1;
      } else if (totalData < limit) {
        offset = 0;
        limit = 3;
      }

      const pageInfo = { page, totalPage, limit, totalData };

      const result = await scheduleModel.getSchedule(
        limit,
        offset,
        movieId,
        location,
        sortType
      );

      if (!result.length) {
        return helpersWrapper.response(
          res,
          404,
          `Data yang kamu cari tidak ditemukan`,
          null
        );
      }

      return helpersWrapper.response(
        res,
        200,
        "Success getting data",
        result,
        pageInfo
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
  getSingleSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await scheduleModel.getSingleSchedule(id);

      if (!result.length) {
        return helpersWrapper.response(
          res,
          404,
          `Data dengan id : ${id} tidak ditemukan`,
          null
        );
      }

      return helpersWrapper.response(
        res,
        200,
        "Success get single schedule",
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
  updateSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await scheduleModel.getSingleSchedule(id);

      if (!checkId.length) {
        return helpersWrapper.response(
          res,
          404,
          `Data dengan id : ${id} tidak ditemukan`,
          null
        );
      }

      const { movieId, premier, price, location, dateStart, dateEnd, time } =
        req.body;

      const data = {
        movieId,
        premier,
        price,
        location,
        dateStart,
        dateEnd,
        time,
        updatedAt: new Date(Date.now()),
      };

      Object.keys(data).forEach((element) => {
        if (!data[element]) {
          delete data[element];
        }
      });

      const result = await scheduleModel.updateSchedule(data, id);

      return helpersWrapper.response(res, 200, "Success update data", result);
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
  deleteSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await scheduleModel.getSingleSchedule(id);

      if (!checkId.length) {
        return helpersWrapper.response(
          res,
          404,
          `Data dengan id : ${id} tidak ditemukan`,
          null
        );
      }

      const result = await scheduleModel.deleteSchedule(id);
      return helpersWrapper.response(res, 200, "Success delete data", result);
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
