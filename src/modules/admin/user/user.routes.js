const { Router } = require("express");
const userController = require("./user.controller");
const { checkPermission } = require("../../../common/middlewares/role.guard");
const { permissionsEnum } = require("../../../common/enums/role.enum");
const { updateUserValidation } = require("./user.validation");
const { validationResultMiddleware } = require("../../../common/middlewares/validation.middleware");

const router = Router()
router.get("/list", checkPermission([permissionsEnum.ADMIN]), userController.getAllUsers)
router.get("/profile", userController.userProfile)
router.patch("/update", updateUserValidation(), validationResultMiddleware, userController.updateProfile)
module.exports = {
    UserRoutes: router
}