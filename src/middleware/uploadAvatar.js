const multer = require("multer");
const helpersWrapper = require("../helpers/wrapper");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/uploads/user");
  },
  filename(req, file, cb) {
    console.log(file);
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const maxSize = 1 * 1024 * 1024; // 1mb

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpeg formats is allowed"));
    }
  },
  limits: { fileSize: maxSize },
}).single("avatar");

const uploadHandling = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return helpersWrapper.response(
        res,
        401,
        "File too large. Max is 1mb",
        null
      );
    }
    if (err) {
      // An unknown error occurred when uploading.
      return helpersWrapper.response(res, 401, err.message, null);
    }
    // Everything went fine.
    next();
  });
};

module.exports = uploadHandling;
