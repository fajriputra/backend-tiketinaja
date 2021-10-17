const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const helpersWrapper = require("../../helpers/wrapper");
const authModel = require("./authModel");
const redisConnection = require("../../config/redis");

const { validateEmail, createActivationToken } = require("../../helpers/auth");
const sendMail = require("../../helpers/email");

module.exports = {
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, phoneNumber, avatar } =
        req.body;

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

      const othersId = uuidv4();
      const setData = {
        id: othersId,
        firstName,
        lastName,
        email,
        password: hashPassword,
        phoneNumber,
        avatar,
      };

      const activation = createActivationToken(setData);

      const setDataEmail = {
        to: email,
        subject: "Email Verification",
        template: "email-verification",
        data: {
          firstname: `${firstName} ${lastName}`,
          email,
          url: `http://localhost:3001/auth/activation/${activation}`,
        },
      };

      await sendMail(setDataEmail);

      return helpersWrapper.response(
        res,
        200,
        "Register is successful! Please check your email to activation"
      );
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },
  activateEmail: async (req, res) => {
    try {
      const { activateToken } = req.body;

      jwt.verify(
        activateToken,
        process.env.ACTIVATION_TOKEN_SECRET,
        async (error, result) => {
          if (error) {
            return helpersWrapper.response(
              res,
              403,
              "Token has expired, please re-register",
              null
            );
          }

          req.decodeToken = result;

          const setData = {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            password: result.password,
            phoneNumber: result.phoneNumber,
          };

          const newResult = await authModel.register(setData);

          await authModel.activateEmail("Active");
          return helpersWrapper.response(
            res,
            200,
            "Your account has been activation",
            newResult
          );
        }
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

      if (checkUser[0].statusUser !== "Active") {
        return helpersWrapper.response(
          res,
          400,
          `Please activate your account`,
          null
        );
      }

      // proses utama membuat token dengan JWT
      const payload = checkUser[0];
      delete payload.password;

      const token = jwt.sign({ ...payload }, process.env.SECRETKEY, {
        expiresIn: "24h",
      });

      // refresh token
      const refreshToken = jwt.sign({ ...payload }, process.env.SECRETKEY, {
        expiresIn: "72h",
      });

      return helpersWrapper.response(res, 200, "Success login", {
        id: payload.id,
        token,
        refreshToken,
      });
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;

      redisConnection.get(`refreshToken:${refreshToken}`, (error, result) => {
        if (!error && result !== null) {
          return helpersWrapper.response(
            res,
            403,
            "Your refresh token cannot be use"
          );
        }

        jwt.verify(refreshToken, process.env.SECRETKEY, (err, result) => {
          if (!err) {
            return helpersWrapper.response(res, 403, err.message);
          }

          delete result.iat;
          delete result.exp;

          const token = jwt.sign(result, process.env.SECRETKEY, {
            expiresIn: "24h",
          });

          const newRefreshToken = jwt.sign(result, process.env.SECRETKEY, {
            expiresIn: "72h",
          });

          redisConnection.setex(
            `refreshToken:${refreshToken}`,
            3600 * 72,
            refreshToken
          );

          return helpersWrapper.response(res, 200, "Success refresh token", {
            id: result.id,
            token,
            refreshToken: newRefreshToken,
          });
        });
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
