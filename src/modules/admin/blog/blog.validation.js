const { body } = require("express-validator")
const { ValidationMessages } = require("../../../common/enums/message.enum")

const createBlogValidation = () => [
    body("title").isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("short_text").isString().isLength({max: 150,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("text").isString().isLength({max: 300,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("tags").isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("category").isMongoId().withMessage(ValidationMessages.CategoryFormat),
]
const updateBlogValidation = () => [
    body("title").optional().isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim(),
    body("short_text").optional().isString().isLength({max: 150,min: 10}).withMessage(ValidationMessages.Length).trim(),
    body("text").optional().isString().isLength({max: 300,min: 10}).withMessage(ValidationMessages.Length).trim(),
    body("tags").optional().isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("category").optional().isMongoId().withMessage(ValidationMessages.CategoryFormat),
]
module.exports = {
    createBlogValidation,
    updateBlogValidation
}