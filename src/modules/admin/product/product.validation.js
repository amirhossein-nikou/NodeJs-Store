const { body } = require("express-validator")
const { ValidationMessages } = require("../../../common/enums/message.enum")

const createProductValidation = () => [
    body("type").isIn(["virtual","physical"]).withMessage(ValidationMessages.Enum),
    body("title").isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("shortDesc").isString().isLength({max: 150,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("description").isString().isLength({max: 300,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("tags").optional().isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("category").isMongoId().withMessage(ValidationMessages.CategoryFormat),
    body("price").isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("count").isNumeric().isLength({max: 5}).withMessage(ValidationMessages.Length).trim(),
    body("discount").isNumeric().isLength({max: 3}).withMessage(ValidationMessages.Length).trim(),
    body("width").isNumeric().optional().isLength({max: 10}).withMessage(ValidationMessages.Length).trim(),
    body("height").isNumeric().optional().isLength({max: 10}).withMessage(ValidationMessages.Length).trim(),
    body("length").isNumeric().optional().isLength({max: 10}).withMessage(ValidationMessages.Length).trim(),
    body("weight").isNumeric().optional().isLength({max: 10}).withMessage(ValidationMessages.Length).trim(),
    body("color").optional().isString().withMessage(ValidationMessages.Format).trim(),
]
const updateProductValidation = () => [
    body("productId").isMongoId().withMessage(ValidationMessages.Format),
    body("type").optional().isIn(["virtual","physical"]).withMessage(ValidationMessages.Enum),
    body("title").optional().isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("shortDesc").optional().isString().isLength({max: 150,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("description").optional().isString().isLength({max: 300,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("tags").optional().isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("category").optional().isMongoId().withMessage(ValidationMessages.CategoryFormat),
    body("price").optional().isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("count").optional().isNumeric().isLength({max: 5}).withMessage(ValidationMessages.Length).trim(),
    body("discount").optional().isNumeric().isLength({max: 3}).withMessage(ValidationMessages.Length).trim(),
    body("width").isNumeric().optional().isLength({max: 10}).withMessage(ValidationMessages.Length).trim(),
    body("height").isNumeric().optional().isLength({max: 10}).withMessage(ValidationMessages.Length).trim(),
    body("length").isNumeric().optional().isLength({max: 10}).withMessage(ValidationMessages.Length).trim(),
    body("weight").isNumeric().optional().isLength({max: 10}).withMessage(ValidationMessages.Length).trim(),
    body("color").optional().isString().withMessage(ValidationMessages.Format).trim(),
]
module.exports = {
    createProductValidation, 
    updateProductValidation
}