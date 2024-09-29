const { body } = require("express-validator");
const { ValidationMessages } = require("../../../common/enums/message.enum");


const createRoleValidation = () => [
    body("title").isString().isLength({ max: 50, min: 3 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("description").isString().isLength({ max: 50, min: 3 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("permission").isString().withMessage(ValidationMessages.Format),
]
const updateRoleValidation = () => [
    body("title").optional().isString().isLength({ max: 50, min: 3 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("description").optional().isString().isLength({ max: 50, min: 3 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("permission").optional().isString().withMessage(ValidationMessages.Format),
]
const createPermissionValidation = () => [
    body("title").isString().isLength({ max: 50, min: 3 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("description").isString().isLength({ max: 50, min: 3 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
]
const updatePermissionValidation = () => [
    body("title").optional().isString().isLength({ max: 50, min: 3 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("description").optional().isString().isLength({ max: 50, min: 3 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
]

module.exports = {
    createRoleValidation,
    createPermissionValidation,
    updateRoleValidation,
    updatePermissionValidation
}