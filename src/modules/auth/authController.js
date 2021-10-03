const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const helpersWrapper = require("../../helpers/wrapper");
const authModel = require("./authModel");
const redisConnection = require("../../config/redis");

const {
  validateEmail,
  // createActivationToken,
  // createAccessToken,
} = require("../../helpers/auth");

module.exports = {
  register: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        avatar,
        // role,
      } = req.body;

      if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return helpersWrapper.response(res, 400, "Field must be filled", null);
      }

      if (!validateEmail(email)) {
        return helpersWrapper.response(
          res,
          400,
          "Must be a valid email address",
          null
        );
      }

      if (password.length < 6) {
        return helpersWrapper.response(
          res,
          400,
          "Password must be at least 6 characters",
          null
        );
      }

      const checkEmail = await authModel.getUserByEmail(email);

      if (checkEmail.length > 0) {
        return helpersWrapper.response(
          res,
          400,
          `${email} already exists`,
          null
        );
      }

      const hashPassword = bcrypt.hashSync(password, 12);

      const setData = {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        password: hashPassword,
        phoneNumber,
        avatar,
        // role,
      };

      const result = await authModel.register(setData);

      return helpersWrapper.response(
        res,
        200,
        "Register telah berhasil",
        result
      );
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await authModel.getUserByEmail(email);

      if (!validateEmail(email)) {
        return helpersWrapper.response(
          res,
          400,
          "Must be a valid email address",
          null
        );
      }

      if (password.length < 6) {
        return helpersWrapper.response(
          res,
          400,
          "Password must be at least 6 characters",
          null
        );
      }

      if (!checkUser.length) {
        return helpersWrapper.response(
          res,
          404,
          `${email} doesn't exists`,
          null
        );
      }

      const isMatch = await bcrypt.compareSync(password, checkUser[0].password);
      if (!isMatch) {
        return helpersWrapper.response(
          res,
          400,
          "Incorrect email or password",
          null
        );
      }

      // proses utama membuat token dengan JWT
      const payload = checkUser[0];
      delete payload.password;

      const token = jwt.sign({ ...payload }, process.env.SECRETKEY, {
        expiresIn: "24h",
      });

      return helpersWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
      });
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },
  logout: async (req, res) => {
    try {
      let token = req.headers.authorization;
      token = token.split(" ")[1];

      redisConnection.setex(`accessToken:${token}`, 3600 * 24, token);

      return helpersWrapper.response(res, 200, "Success logout", null);
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },
};
