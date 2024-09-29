const autoBind = require("auto-bind");
const { userModel: UserModel } = require("../admin/user/users.model");
const createHttpError = require("http-errors");
const { UserMessages } = require("../../common/enums/message.enum");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { redisClient } = require("../../configs/redis.config");
const { rolesEnum } = require("../../common/enums/role.enum");
class AuthService {
    #userModel
    constructor() {
        autoBind(this)
        this.#userModel = UserModel
    }
    async sendOtp(phone) {
        let user = await this.#userModel.findOne({ phone })
        const code = crypto.randomInt(10000, 99999).toString()
        const now = Date.now()
        const otp = {
            code,
            expiresIn: now + (1000 * 60 * 2)
        }
        if (!user) {
            user = await this.#userModel.create({
                phone,
                otp,
                role: rolesEnum.User
            })
        } else {
            if (user.otp && user.otp?.expiresIn > now) throw new createHttpError.BadRequest(UserMessages.NotExpiresCode)
            user.otp = otp;
            await user.save()
        }
        return {
            message: "otp send successFully",
            code: user.otp?.code
        }
    }
    async checkOtp(phone, code) {
        const user = await this.checkExistsUserByPhone(phone)
        if (!user.otp) throw new createHttpError.NotFound(UserMessages.OptNotFound)
        if (user.otp?.expiresIn < Date.now()) throw new createHttpError.BadRequest(UserMessages.OptNotFound)
        if (user.otp?.code !== code) throw new createHttpError.Unauthorized(UserMessages.InvalidCode)
        const accessToken = await this.createToken({ id: user._id })
        const refreshToken = await this.createRefreshToken({ id: user._id })
        user.verifyPhone = true;
        await user.save()
        return {
            message: "Welcome to website",
            accessToken,
            refreshToken
        }
    }
    async checkExistsUserByPhone(phone) {
        const user = await this.#userModel.findOne({ phone })
        if (!user) throw createHttpError.NotFound(UserMessages.Notfound)
        return user
    }
    async createToken(payload) {
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "1h"
        })
        await redisClient.setEx(`access_${payload.id}`,(60*60), token)
        return token;
    }
    async createRefreshToken(payload) {
        const token = await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
            expiresIn: "1y"
        })
        await redisClient.setEx(`refresh_${payload.id}`, (365 * 24 * 60 * 60), token)
        return token;
    }
}

module.exports = new AuthService()