const redisConnection = require("../config/redis");
const helpersWrapper = require("../helpers/wrapper");

module.exports = {
  getMovieRedis: (req, res, next) => {
    redisConnection.get(
      `getMovie:${JSON.stringify(req.query)}`,
      // eslint-disable-next-line consistent-return
      (error, result) => {
        if (!error && result !== null) {
          console.log("data ada didalam redis");
          const newResult = JSON.parse(result);

          return helpersWrapper.response(
            res,
            200,
            "Success get movie",
            newResult.newResult,
            newResult.pageInfo
          );
        }
        console.log("data tidak ada di dalam redis");
        next();
      }
    );
  },
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params;
    // eslint-disable-next-line consistent-return
    redisConnection.get(`getMovie:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);

        return helpersWrapper.response(
          res,
          200,
          "Success get single movie",
          newResult
        );
      }
      console.log("data tidak ada di dalam redis");
      next();
    });
  },
  clearMovieRedis: (req, res, next) => {
    redisConnection.keys("getMovie:*", (error, result) => {
      if (result.length > 0) {
        // proses delete keys
        result.forEach((item) => redisConnection.del(item));
      }
      next();
    });
  },
  getScheduleRedis: (req, res, next) => {
    redisConnection.get(
      `getSchedule:${JSON.stringify(req.query)}`,
      // eslint-disable-next-line consistent-return
      (error, result) => {
        if (!error && result !== null) {
          console.log("data ada didalam redis");
          const newResult = JSON.parse(result);

          return helpersWrapper.response(
            res,
            200,
            "Success get schedule",
            newResult.newResult,
            newResult.pageInfo
          );
        }
        console.log("data tidak ada di dalam redis");
        next();
      }
    );
  },
  getScheduleByIdRedis: (req, res, next) => {
    const { id } = req.params;
    // eslint-disable-next-line consistent-return
    redisConnection.get(`getSchedule:${id}`, (error, result) => {
      if (!error && result !== null) {
        console.log("data ada di dalam redis");
        const newResult = JSON.parse(result);

        return helpersWrapper.response(
          res,
          200,
          "Success get single schedule",
          newResult
        );
      }
      console.log("data tidak ada di dalam redis");
      next();
    });
  },
  clearScheduleRedis: (req, res, next) => {
    redisConnection.keys("getSchedule:*", (error, result) => {
      if (result.length > 0) {
        // proses delete keys
        result.forEach((item) => redisConnection.del(item));
      }
      next();
    });
  },
};
