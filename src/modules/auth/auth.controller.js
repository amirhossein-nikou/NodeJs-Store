const createHttpError = require("http-errors");
// @ts-ignore
const { cookieName } = require("../../common/enums/cookieName.enum");
const { UserMessages } = require("../../common/enums/message.enum");
const { redisClient } = require("../../configs/redis.config");
const Controller = require("../../controller");
const authService = require("./auth.service");
const jwt = require("jsonwebtoken");

class AuthController extends Controller {
    #service;
    constructor(){
        super()
        this.#service = authService
    }
    async sendOtp(req, res, next) {
        try {
            const {phone} = req.body
            const result = await this.#service.sendOtp(phone)
            res.json(result)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
        async checkOtp(req, res, next) {
        try {
            const {phone,code} = req.body
            const result = await this.#service.checkOtp(phone,code)
            // res.cookie(cookieName.ACCESS_TOKEN,result.accessToken,{
            //     httpOnly: true,
            //     expiresIn: "1h"
            // })
            // res.cookie(cookieName.REFRESH_TOKEN,result.refreshToken,{
            //     httpOnly: true,
            //     expiresIn: "1y"
            // })
            res.json({result})
        } catch (error) {
            next(error)
        }
    }
        async refreshToken(req, res, next) {
        try {
            const token = req.params.refreshToken
            const refreshToken = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET_KEY)
            // @ts-ignore
            const ref = await redisClient.get(`refresh_${refreshToken.id}`)
            if(ref !== token) throw new createHttpError.Unauthorized(UserMessages.InvalidRefreshToken)
            // @ts-ignore
            const accessToken = await this.#service.createToken({id: refreshToken.id})
            // @ts-ignore
            const newRefreshToken = await this.#service.createRefreshToken({id: refreshToken.id})
            const result = {
                data: {
                    message: UserMessages.Refresh,
                    accessToken,
                    newRefreshToken,
                }
            }
            res.json({result})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    
}
module.exports = new AuthController()
