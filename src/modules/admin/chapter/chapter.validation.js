const { body } = require("express-validator");
const { ValidationMessages } = require("../../../common/enums/message.enum");

const createChapterValidation = ()=>[
    body("title").isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("text").optional().isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("courseId").isMongoId().withMessage(ValidationMessages.CategoryFormat),
]
const updateChapterValidation = ()=>[
    body("title").optional().isString().isLength({max: 50,min: 3}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("text").optional().isString().isLength({max: 50,min: 5}).withMessage(ValidationMessages.Length).trim().notEmpty(),
    body("chapterId").isMongoId().withMessage(ValidationMessages.CategoryFormat),
]
module.exports = {
    createChapterValidation,
    updateChapterValidation
}