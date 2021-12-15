const bcrypt = require("bcrypt");
const { validateEmail } = require("../../helpers/auth");
const helpersWrapper = require("../../helpers/wrapper");
const deleteFile = require("../../helpers/uploads/deleteFile");

const authModel = require("../auth/authModel");
const userModel = require("./userModel");

module.exports = {
  updatePassword: async (req, res) => {
    try {
      const { id } = req.decodeToken;

      const { newPassword, confirmPassword } = req.body;

      if (!newPassword || !confirmPassword) {
        return helpersWrapper.response(
          res,
          400,
          "All fields must be filled",
          null
        );
      }

      if (newPassword.length < 6) {
        return helpersWrapper.response(
          res,
          400,
          "Password must be at least 6 characters",
          null
        );
      }

      if (newPassword !== confirmPassword) {
        return helpersWrapper.response(
          res,
          400,
          "Password doesn't matches",
          null
        );
      }

      const hashPassword = await bcrypt.hashSync(newPassword, 12);

      const setData = { password: hashPassword };

      const result = await userModel.updateUser(setData, id);

      return helpersWrapper.response(
        res,
        200,
        "Success update password",
        result
      );
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { id } = req.decodeToken;

      const { firstName, lastName, email, phoneNumber } = req.body;

      if (!firstName || !lastName || !phoneNumber) {
        return helpersWrapper.response(
          res,
          400,
          "All fields must be filled",
          null
        );
      }

      if (email) {
        const checkEmail = await authModel.getUserByEmail(email);

        if (checkEmail.length > 0) {
          return helpersWrapper.response(
            res,
            400,
            `${email} already exists`,
            null
          );
        }

        if (!validateEmail(email)) {
          return helpersWrapper.response(
            res,
            400,
            "Must be a valid email address",
            null
          );
        }
      }

      const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
        updatedAt: new Date(Date.now()),
      };

      Object.keys(data).forEach((element) => {
        if (!data[element]) {
          delete data[element];
        }
      });

      const result = await userModel.updateUser(data, id);

      return helpersWrapper.response(
        res,
        200,
        "Success update profile",
        result
      );
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.decodeToken;

      const checkId = await userModel.getUserById(id);

      return helpersWrapper.response(res, 200, "Success get user", checkId);
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },
  uploadAvatar: async (req, res) => {
    try {
      const { id } = req.decodeToken;

      const checkUser = await userModel.getUserById(id);

      const data = {
        avatar: req.file ? req.file.filename : null,
        updatedAt: new Date(Date.now()),
      };

      if (req.file && checkUser[0].avatar) {
        deleteFile(`public/uploads/user/${checkUser[0].avatar}`);
      }

      const result = await userModel.updateUser(data, id);

      return helpersWrapper.response(res, 200, "Success update avatar", result);
    } catch (error) {
      return helpersWrapper.response(res, 400, `SQL : ${error.message}`, null);
    }
  },
};
