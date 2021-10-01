const router = require("express").Router();

const userController = require("./userController");
const middlewareAuth = require("../../middleware/auth");
const middlewareAvatar = require("../../middleware/uploadAvatar");

router.get("/", middlewareAuth.authentication, userController.getUserById);
router.patch(
  "/avatar",
  middlewareAuth.authentication,
  middlewareAvatar,
  userController.uploadAvatar
);
router.patch(
  "/update-password",
  middlewareAuth.authentication,
  userController.updatePassword
);
router.patch(
  "/update-profile",
  middlewareAuth.authentication,
  userController.updateProfile
);

module.exports = router;
