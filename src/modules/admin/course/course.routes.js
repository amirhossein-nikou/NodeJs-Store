const { Router } = require("express");
const courseController = require("./course.controller");
const { uploadFile } = require("../../../common/middlewares/multer.middleware");
const { StringToArray } = require("../../../common/utils/stringToArray.utils");
const { createCourseValidation, updateCourseValidation } = require("./course.validation");
const { validationResultMiddleware } = require("../../../common/middlewares/validation.middleware");

const router = Router()
router.get("/", courseController.getCourses)
router.get("/:id", courseController.getCourseById)
router.post("/create", uploadFile.single("image"),
    createCourseValidation(), validationResultMiddleware,
    StringToArray("tags"), courseController.createCourses);
router.patch("/update", uploadFile.single("image"),
    updateCourseValidation(), validationResultMiddleware,
    StringToArray("tags"), courseController.updateCourse);

module.exports = {
    CourseRoutes: router
}