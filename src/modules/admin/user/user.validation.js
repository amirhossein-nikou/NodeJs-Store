const { body } = require("express-validator");
const { ValidationMessages } = require("../../../common/enums/message.enum");

const updateUserValidation = () => [
    body("firstname").optional().isString().isLength({max: 50,min: 3}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("lastname").optional().isString().isLength({max: 50,min: 3}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("username").optional().isString().isLength({max: 50,min: 3}).withMessage(ValidationMessages.Length).trim().notEmpty(),
]
module.exports = {updateUserValidation}