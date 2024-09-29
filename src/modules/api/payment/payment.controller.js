const autoBind = require("auto-bind");
const paymentService = require("./payment.service");
const { StatusCodes } = require("http-status-codes");

class paymentController {
    #service
    constructor(){
        autoBind(this)
        this.#service = paymentService
    }
    async paymentGateway(req,res,next){
        try {
            
            const result = await this.#service.paymentGateway(req.user)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
    async verifyPayment(req,res,next){
        try {
            const result = await this.#service.verifyPayment(req.query)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new paymentController()