const { body } = require("express-validator");
const { ValidationMessages } = require("../../../common/enums/message.enum");

const createCourseValidation = () => [
    body("type").isIn(["free","cash","special"]).withMessage(ValidationMessages.Enum),
    body("title").isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("shortDesc").isString().isLength({max: 150,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("description").isString().isLength({max: 300,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("tags").optional().isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("category").isMongoId().withMessage(ValidationMessages.CategoryFormat),
    body("price").isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("discount").optional().isNumeric().isLength({max: 3}).withMessage(ValidationMessages.Length).trim(),
]
const updateCourseValidation = () => [
    body("courseId").isMongoId().withMessage(ValidationMessages.CategoryFormat),
    body("type").optional().isIn(["free","cash","special"]).withMessage(ValidationMessages.Enum),
    body("title").optional().isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("shortDesc").optional().isString().isLength({max: 150,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("description").optional().isString().isLength({max: 300,min: 10}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("tags").optional().isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("category").optional().isMongoId().withMessage(ValidationMessages.CategoryFormat),
    body("price").optional().isString().isLength({max: 50}).withMessage(ValidationMessages.Length).trim().not().isArray(),
    body("discount").optional().isNumeric().isLength({max: 3}).withMessage(ValidationMessages.Length).trim(),
]

module.exports ={createCourseValidation,updateCourseValidation}