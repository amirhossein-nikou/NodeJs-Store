const { Router } = require("express");
const chapterController = require("./chapter.controller");
const { createChapterValidation, updateChapterValidation } = require("./chapter.validation");
const { validationResultMiddleware } = require("../../../common/middlewares/validation.middleware");

const router = Router()
router.put("/add",
    createChapterValidation(),validationResultMiddleware,
    chapterController.addChapter)
router.get("/list/:courseId",chapterController.getChapter)
router.get("/getOne/:chapterId",chapterController.getChapterById)
router.delete("/remove/:chapterId",chapterController.removeChapter)
router.patch("/update",updateChapterValidation(),validationResultMiddleware,chapterController.updateChapter)

module.exports = {
    ChapterRoutes: router
}