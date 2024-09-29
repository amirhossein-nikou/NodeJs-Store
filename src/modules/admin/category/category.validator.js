const { body } = require("express-validator");
const { ValidationMessage } = require("../../../common/enums/message.enum");

const categoryValidation = () => [
    body("title").isString().isLength({max:50}).trim().toLowerCase(),
    body("parent").isMongoId().withMessage(ValidationMessage.TypeError).optional()
]
const updateValidation = () => [
    body("title").isString().isLength({max:50}).trim().toLowerCase(),
]

module.exports = {categoryValidation,updateValidation}