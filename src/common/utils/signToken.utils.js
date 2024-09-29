const jwt = require("jsonwebtoken");
const { userModel } = require("../../modules/admin/user/users.model");
const createHttpError = require("http-errors");
function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await userModel.findById(userId)
        const payload = {
            mobile: user.phone,
            id: userId
        };
        const options = {
            expiresIn: "1d"
        };
        jwt.sign(payload, process.env.TOKEN_SECRET_KEY, options, (err, token) => {
            if (err) reject(createHttpError.InternalServerError());
            resolve(token)
        })
    })
}
module.exports = {
    signAccessToken
}