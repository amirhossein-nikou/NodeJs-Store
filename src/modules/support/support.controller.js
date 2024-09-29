const autoBind = require("auto-bind");
const { UserMessages } = require("../../common/enums/message.enum");
const { userModel } = require("../admin/user/users.model");
const { signAccessToken } = require("../../common/utils/signToken.utils");

class SupportController {
    constructor() {
        autoBind(this)
    }
    loginForm(req, res, next) {
        try {
            res.render("login.ejs", {
                error: undefined
            })
        } catch (error) {
            next(error)
        }
    }
    async login(req, res, next) {
        try {
            const { mobile } = req.body
            const user = await userModel.findOne({ phone: mobile })
            if (!user) {
                return res.render("login.ejs", {
                    error: UserMessages.Notfound
                })
            }
            const token = await signAccessToken(user._id)
            res.cookie("authorization", token, {
                signed: true,
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 1)
            })
            user.token = token
            await user.save()
            return res.redirect("/support")
        } catch (error) {
            next(error)
        }
    }
    renderChatRoom(req, res, next) {
        try {
            return res.render("chat.ejs")
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new SupportController()