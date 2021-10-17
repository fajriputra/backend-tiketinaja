const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateEmail = (email) => {
  const re =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const createActivationToken = (payload) =>
  jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: "15m" });

module.exports = {
  validateEmail,
  createActivationToken,
};
