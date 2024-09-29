const { Router } = require("express");
const roleController = require("./role.controller");
const { createRoleValidation, updateRoleValidation } = require("../RBAC.validation");
const { validationResultMiddleware } = require("../../../../common/middlewares/validation.middleware");
const { StringToArray } = require("../../../../common/utils/stringToArray.utils");
const router = Router()
router.get("/list",roleController.getRoleList)
router.post("/create",createRoleValidation(),validationResultMiddleware,StringToArray("permission"),roleController.createRole)
router.delete("/:filed",roleController.removeRole)
router.patch("/update/:roleId",updateRoleValidation(),validationResultMiddleware,StringToArray("permission"),roleController.updateRole)
module.exports = {
    RoleRoutes: router
}