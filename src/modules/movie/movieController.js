const movieModel = require("./movieModel");
const helpersWrapper = require("../../helpers/wrapper");

module.exports = {
  storeMovies: async (req, res) => {
    try {
      const {
        name,
        category,
        releaseDate,
        cast,
        director,
        duration,
        synopsis,
      } = req.body;

      const data = {
        name,
        category,
        releaseDate,
        cast,
        director,
        duration,
        synopsis,
      };
      const result = await movieModel.storeMovies(data);

      return helpersWrapper.response(res, 200, "Success create data", result);
    } catch (error) {
      return helpersWrapper.response(
        res,
        400,
        `Bad request : ${error.message}`,
        null
      );
    }
  },
  getMovies: async (req, res) => {
    try {
      // eslint-disable-next-line prefer-const
      let { page, limit, q, sortBy, sortType } = req.query;
      page = Number(page) || 1;
      limit = Number(limit) || 3;
      q = q || "";
      sortBy = sortBy || "name";
      sortType = sortType || "asc";

      let offset = page * limit - limit;
      const totalData = await movieModel.getCountMovie();
      const totalPage = Math.ceil(totalData / limit);

      if (totalPage < page) {
        offset = 0;
        page = 1;
      }

      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };

      const result = await movieModel.getMovies(
        limit,
        offset,
        q,
        sortBy,
        sortType
      );

      if (!result.length) {
        return helpersWrapper.response(
          res,
          404,
          `Data ${q} tidak ditemukan`,
          result,
          pageInfo
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
  getSingleMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await movieModel.getSingleMovie(id);

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
        "Success get single movie",
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

  updateMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await movieModel.getSingleMovie(id);

      if (!checkId.length) {
        return helpersWrapper.response(
          res,
          404,
          `Data dengan id : ${id} tidak ditemukan`,
          null
        );
      }
      const {
        name,
        category,
        releaseDate,
        cast,
        director,
        duration,
        synopsis,
      } = req.body;

      const data = {
        name,
        category,
        releaseDate,
        cast,
        director,
        duration,
        synopsis,
        updatedAt: new Date(Date.now()),
      };

      Object.keys(data).forEach((element) => {
        if (!data[element]) {
          delete data[element];
        }
      });

      const result = await movieModel.updateMovie(data, id);
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
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await movieModel.getSingleMovie(id);

      if (!checkId.length) {
        return helpersWrapper.response(
          res,
          404,
          `Data dengan id : ${id} tidak ditemukan`,
          null
        );
      }
      const result = await movieModel.deleteMovie(id);
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
