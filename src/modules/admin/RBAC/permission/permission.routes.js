const { Router } = require("express");
const permissionController = require("./permission.controller");
const { createPermissionValidation, updatePermissionValidation } = require("../RBAC.validation");
const { validationResultMiddleware } = require("../../../../common/middlewares/validation.middleware");

const router = Router()
router.get("/list", permissionController.getPermissionList)
router.post("/create",
    createPermissionValidation(), validationResultMiddleware,
    permissionController.createPermission)

router.delete("/:permissionId", permissionController.removePermission)

router.patch("/update/:permissionId",
    updatePermissionValidation(), validationResultMiddleware,
    permissionController.updatePermission)
module.exports = {
    PermissionRoutes: router
}