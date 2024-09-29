const { Router } = require("express");
const episodeController = require("./episode.controller");
const { uploadVideoFile } = require("../../../common/middlewares/multer.middleware");
const { addEpisodeValidation, updateEpisodeValidation } = require("./episode.validation");
const { validationResultMiddleware } = require("../../../common/middlewares/validation.middleware");

const router = Router()
router.post("/add", uploadVideoFile.single("video"),
    addEpisodeValidation(), validationResultMiddleware,
    episodeController.addEpisode)
router.delete("/remove/:episodeId",episodeController.removeEpisode)

router.patch("/update/:episodeId",uploadVideoFile.single("video")
,updateEpisodeValidation(),validationResultMiddleware,
episodeController.updateEpisode)

module.exports = {
    EpisodeRoutes: router
}