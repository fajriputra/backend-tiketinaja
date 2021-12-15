const router = require("express").Router();

const authController = require("./authController");
const middlewareAuth = require("../../middleware/auth");

router.post("/register", authController.register);
router.post("/activation", authController.activateEmail);
router.post("/login", authController.login);
router.post(
  "/refresh-token",
  middlewareAuth.authentication,
  authController.refreshToken
);
router.post("/logout", middlewareAuth.authentication, authController.logout);

module.exports = router;
