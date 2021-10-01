/* eslint-disable no-shadow */
const jwt = require("jsonwebtoken");
const helpersWrapper = require("../helpers/wrapper");
const redisConnection = require("../config/redis");

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      return helpersWrapper.response(res, 403, "Please login first", null);
    }

    token = token.split(" ")[1];

    redisConnection.get(`accessToken:${token}`, (error, result) => {
      if (!error && result !== null) {
        return helpersWrapper.response(
          res,
          403,
          "Token has been destroyed, please login again",
          null
        );
      }
      jwt.verify(token, process.env.SECRETKEY, (error, result) => {
        if (error) {
          return helpersWrapper.response(
            res,
            403,
            "Token expired, please login now!",
            null
          );
        }

        req.decodeToken = result;
        next();
      });
    });
  },
  isAdmin: (req, res, next) => {
    if (req.decodeToken.role !== "admin") {
      return helpersWrapper.response(
        res,
        403,
        "You don't have access to this action",
        null
      );
    }
    next();
  },
};
