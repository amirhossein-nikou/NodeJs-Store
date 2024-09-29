const { Router } = require("express");
const categoryController = require("./category.controller");
const { categoryValidation, updateValidation } = require("./category.validator");
const { validationResultMiddleware } = require("../../../common/middlewares/validation.middleware");

const router = Router()
router.get("/parents", categoryController.findParents)
router.get("/", categoryController.findAll)
router.post("/create", categoryValidation(),validationResultMiddleware, categoryController.createCategory)
router.post("/child/:parentId", categoryController.findChild)
router.post("/:id", categoryController.findById)
router.patch("/update/:id", updateValidation(),validationResultMiddleware, categoryController.update)
router.delete("/:categoryId", categoryController.remove)
module.exports = {
    CategoryRoutes: router
}