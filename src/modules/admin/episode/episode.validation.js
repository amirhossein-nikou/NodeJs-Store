const { body } = require("express-validator");
const { ValidationMessages } = require("../../../common/enums/message.enum");

const addEpisodeValidation = () => [
    body("type").isIn(["unlock", "lock"]).withMessage(ValidationMessages.Enum),
    body("title").isString().isLength({ max: 50, min: 5 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("text").optional().isString().isLength({ max: 50, min: 5 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("courseId").isMongoId().withMessage(ValidationMessages.CategoryFormat),
    body("chapterId").isMongoId().withMessage(ValidationMessages.CategoryFormat),
]
const updateEpisodeValidation = () => [
    body("type").optional().isIn(["unlock", "lock"]).withMessage(ValidationMessages.Enum),
    body("title").optional().isString().isLength({ max: 50, min: 5 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("text").optional().isString().isLength({ max: 50, min: 5 }).withMessage(ValidationMessages.Length).trim().notEmpty(),
]
module.exports = {
    addEpisodeValidation,
    updateEpisodeValidation
}