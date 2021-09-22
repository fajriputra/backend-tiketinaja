const router = require("express").Router();

const movieController = require("./movieController");

router.post("/", movieController.storeMovies);
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getSingleMovie);
router.patch("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
