const createHttpError = require("http-errors")
const { UserMessages } = require("../enums/message.enum")
const jwt = require("jsonwebtoken")
const { userModel } = require("../../modules/admin/user/users.model")
const { redisClient } = require("../../configs/redis.config")
const authService = require("../../modules/auth/auth.service")
const { setCookies } = require("../utils/cookies.utils")
const { cookieName } = require("../enums/cookieName.enum")
async function generateAccessTokenWithRefreshToken(refreshToken) {
    const refreshTokenData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY)
    if (typeof refreshTokenData == "object" && "id" in refreshTokenData) {
        const accessToken = await authService.createToken({ id: refreshTokenData.id })
        return accessToken
    }
}
async function AuthValidation(req, res, next) {
    try {
        let accessToken = req.cookies?.[cookieName.ACCESS_TOKEN]
        const refreshToken = req.cookies?.[cookieName.REFRESH_TOKEN]
        let data;
        if (accessToken && accessToken?.trim !== "" && accessToken !== "undefined") {
            data = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY)
        } else if (!accessToken || accessToken == "undefined" && refreshToken && refreshToken?.trim() !== "") {
            accessToken = await generateAccessTokenWithRefreshToken(refreshToken)
            console.log(accessToken);
            setCookies(res, cookieName.ACCESS_TOKEN, "1h", accessToken)
            data = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY)
        }
        if (typeof data == "object" && "id" in data) {
            if (!refreshToken) {
                console.log("object");
                const token = await authService.createRefreshToken({ id: data.id })
                setCookies(res, cookieName.REFRESH_TOKEN, "1y", token)
            }

            const ref = await redisClient.get(`refresh_${data.id}`)
            const acc = await redisClient.get(`access_${data.id}`)
            if (accessToken !== acc && refreshToken !== ref) throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
            if (accessToken !== acc && refreshToken === ref) {
                //refresh accessToken if expired using refresh token
                accessToken = generateAccessTokenWithRefreshToken(refreshToken)
                setCookies(res, "access_token", "1h", accessToken)
            }
            const user = await userModel.findById(data.id, { otp: 0, __v: 0, updatedAt: 0, verifyPhone: 0, password: 0 }).lean()
            if (!user) throw new createHttpError.NotFound(UserMessages.Notfound)
            req.user = user
            next()
            return true
        }
        throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
    } catch (error) {
        next(error)
    }
}
async function validateAccessToken(req, res, next) {
    try {
        if (req.headers?.authorization == undefined) throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
        const [bearer, token] = req.headers?.authorization?.split(" ")
        if (bearer.toLowerCase() === "bearer" && token && token?.trim() !== "") {
            const data = verifyAccessToken(token)
            if (typeof data == "object" && "id" in data) {
                const accessToken = await redisClient.get(`access_${data.id}`)
                if (accessToken !== token) next(new createHttpError.Unauthorized(UserMessages.InvalidToken))
                const user = await userModel.findById(data.id, { otp: 0, __v: 0, updatedAt: 0, verifyPhone: 0, password: 0 }).lean()
                if (!user) throw new createHttpError.NotFound(UserMessages.Notfound)
                req.user = user
                return next()
            }
            throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
        }
        throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
    } catch (error) {
        next(error)
    }
}
function verifyAccessToken(accessToken) {
    if (!accessToken && accessToken?.trim === "" && accessToken === "undefined")
        throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
    const data = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY)
    return data
}

async function validateAccessTokenInGraphQL(req) {
    try {
        if (req.headers?.authorization == undefined) throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
        const [bearer, token] = req.headers?.authorization?.split(" ")
        if (bearer.toLowerCase() === "bearer" && token && token?.trim() !== "") {
            const data = verifyAccessToken(token)
            if (typeof data == "object" && "id" in data) {
                const accessToken = await redisClient.get(`access_${data.id}`)
                if (accessToken !== token) throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
                const user = await userModel.findById(data.id, { otp: 0, __v: 0, updatedAt: 0, verifyPhone: 0, password: 0 }).lean()
                if (!user) throw new createHttpError.NotFound(UserMessages.Notfound)
                req.user = user
                return true
            }
            throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
        }
        throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
    } catch (error) {
        throw new createHttpError.Unauthorized(UserMessages.InvalidToken)
    }
}
async function checkLogin(req, res, next) {
    try {
        const token = req.signedCookies["authorization"]
        if (token) {
            const user = await userModel.findOne({ token }, { basket: 0, products: 0, courses: 0, password: 0 })
            if (user) {
                req.user = user
                return next()
            }
        }
        return res.render("login.ejs", {
            error: UserMessages.InvalidToken
        })
    } catch (error) {
        next(error)
    }
}
async function checkAccessLogin(req, res, next) {
    try {
        const token = req.signedCookies["authorization"]
        if (token) {
            const user = await userModel.findOne({ token }, { basket: 0, products: 0, courses: 0, password: 0 })
            if (user) {
                req.user = user
                return res.redirect("/support")
            }
        }
        return next()
    } catch (error) {
        next(error)
    }
}
// function checkRole(role) {
//     return function (req, res, next) {
//         try {
//             const userRole = req.user.role
//             if (userRole.includes(role)) return next()
//             throw new createHttpError.Forbidden(UserMessages.RoleError)
//         } catch (error) {
//             next(error)
//         }

//     }
// }
module.exports = {
    AuthValidation: validateAccessToken,
    validateAccessTokenInGraphQL,
    checkAccessLogin,
    checkLogin
}