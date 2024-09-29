const { Router } = require("express");

const authController = require("./auth.controller");
const { otpValidation } = require("./auth.validator");
const { validationResultMiddleware } = require("../../common/middlewares/validation.middleware");
const { AuthValidation } = require("../../common/middlewares/auth.middleware");
const router = Router()
router.post("/send-otp",otpValidation(),validationResultMiddleware,authController.sendOtp)
router.post("/check-otp",otpValidation(),validationResultMiddleware,authController.checkOtp)
router.put("/refresh-token/:refreshToken",authController.refreshToken)

module.exports = {
    AuthRouter: router
}