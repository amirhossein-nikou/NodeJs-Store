// @ts-nocheck
const autoBind = require("auto-bind");
const { paymentModel } = require("./payment.model");
const { getUserBasket } = require("../../../common/utils/basket.utils");
const { default: axios } = require("axios");
const createHttpError = require("http-errors");
const { paymentMessage } = require("../../../common/enums/message.enum");
const { generateInvoiceNumber } = require("../../../common/utils/invoiceNumber.utils");
const { userModel } = require("../../admin/user/users.model");
// @ts-ignore
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
class PaymentService {
    #model
    constructor() {
        autoBind(this)
        this.#model = paymentModel
    }
    async paymentGateway(user) {
        if (user.basket.products?.length == 0 && user.basket.courses?.length === 0) throw new createHttpError.NotFound(paymentMessage.Basket)
        const basket = (await getUserBasket(user._id))?.[0]
        if (!basket?.paymentDetails?.paymentAmount) throw new createHttpError.BadRequest(paymentMessage.PaymentDetailsNotFound)
        const zarinpalURL = "https://payment.zarinpal.com/pg/v4/payment/request.json"
        const zarinpalGatewayURL = "https://payment.zarinpal.com/pg/StartPay/"
        const amount = basket?.payDetails?.paymentAmount
        const descriptions = "بابت خرید از سایت"
        const zarinpalOptions = {
            merchant_id: process.env.ZP_MERCHANT, // its Empty
            amount,
            descriptions,
            metadata: {
                email: user.email || "email@gmail.com",
                mobile: user.mobile
            },
            callback_usl: `${process.env.HOST}:${process.env.PORT}/verify`
        }
        const requestResult = (await axios.post(zarinpalURL, zarinpalOptions)).data
        const { code, authority } = requestResult
        const payment = await this.#model.create({
            invoiceNumber: generateInvoiceNumber(),
            amount,
            user: user._id,
            descriptions,
            authority,
            verify: false,
            basket
        })
        if (code == 100 && authority) {
            return {
                code,
                gatewayURL: `${zarinpalGatewayURL}/${authority}`

            }
        }
        throw new createHttpError.BadRequest(paymentMessage.ParametersError)
    }
    async verifyPayment(query) {
        const { Authority: authority } = query;
        const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
        const payment = await this.#model.findOne({ authority })
        if (!payment) throw new createHttpError.NotFound(paymentMessage.NotFound)
        if (payment.verify) throw new createHttpError.BadRequest(paymentMessage.Verified)
        const verifyBody = JSON.stringify({
            authority,
            amount: payment.amount,
            merchant_id: process.env.ZP_MERCHANT,
        })
        const verifyResult = await fetch(verifyURL, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: verifyBody
        }).then(result => result.json())
        // @ts-ignore
        if (verifyResult.data.code == 100) {
            await this.#model.updateOne({ authority }, {
                refId: verifyResult.data.ref_id,
                cardHash: verifyResult.data.card_hash,
                verify: true
            });
            const user = await userModel.findOne({ _id: payment.user })
            await userModel.updateOne({ _id: payment.user }, {
                $set: {
                    courses: [...payment?.basket?.paymentDetails?.courseIds || [], ...user.courses],
                    products: [...payment?.basket?.paymentDetails?.productIds || [], ...user.products],
                    basket: {
                        products: [],
                        courses: [],
                    }
                }
            })
            return {
                message: paymentMessage.Success
            }
        }
        throw new createHttpError.NotAcceptable(paymentMessage.Failed)
    }
}



//------ shaparak - bankMelat - pasargad -- and all direct banks - bedon vaset----------
//1- payment
//2- checkTransactions
//3- verifyTransactions
//------------ ZarinPal - digipay - be sorat vaset --------------
//1- payment
//2- verify
module.exports = new PaymentService()