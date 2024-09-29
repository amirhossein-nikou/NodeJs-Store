const { Router } = require("express");
const paymentController = require("./payment.controller");
const { AuthValidation } = require("../../../common/middlewares/auth.middleware");

const router = Router()
router.post("/",AuthValidation,paymentController.paymentGateway)
router.get("/verify",paymentController.verifyPayment)

module.exports ={
    PaymentRoutes: router
}