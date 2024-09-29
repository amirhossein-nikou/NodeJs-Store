const { body} = require("express-validator")
const { ValidationMessage } = require("../../common/enums/message.enum")
const otpValidation = () => [
    body("phone").isMobilePhone("fa-IR").withMessage(ValidationMessage.InvalidPhone).trim(),
    // body("firstname").isString().matches(/^[a-z\u0600-\u06FF\s]+$/gim).isLength({ max: 50 }).trim().toLowerCase(),
    // body("lastname").isString().matches(/^[a-z\u0600-\u06FF\s]+$/gim).isLength({ max: 50 }).trim().toLowerCase(),
    // body("email").optional().isEmail({
    //     host_whitelist: ["gmail.com", "yahoo.com", "outlook.com", "aol.com", "mail.com", "icloud.com", "fastmail.com"],
    // }).withMessage(ValidationMessage.Email).isString(),
    // body("username").optional().isString().matches(/^[a-z]+[A-Z0-9\_\@\.]+[a-z0-9]$/gim).isLength({ min: 3, max: 50 }).trim().toLowerCase(),
    // body("password").isString().isLength({min:8,max:64}).withMessage(ValidationMessage.PasswordLength).isStrongPassword({
    //     minLength:5,
    //     minLowercase: 1,
    //     minNumbers: 1,
    //     minSymbols: 1,
    //     minUppercase: 1,
    // }).withMessage(ValidationMessage.PasswordWeak).trim(),
    // body("confirmPassword").custom((value,{req}) => {
    //     if(value !== req.body?.password){
    //         throw new createHttpError.BadRequest(ValidationMessage.ConfirmPassword)
    //     }
    //     return true
    // })
    body("code").optional().isString().matches(/^[0-9]{5,5}$/ig).withMessage(ValidationMessage.CodeFormat)
    .isLength({max: 5,min:5}).withMessage(ValidationMessage.CodeLength).trim()
]

module.exports = {
    otpValidation,

}