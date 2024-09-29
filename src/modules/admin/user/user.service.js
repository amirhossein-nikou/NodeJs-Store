const autoBind = require("auto-bind");
const { userModel } = require("./users.model");
const createHttpError = require("http-errors");
const { UserMessages } = require("../../../common/enums/message.enum");

class UserService {
    #model
    constructor() {
        autoBind(this)
        this.#model = userModel
    }
    async getAllUsers(search) {
        let query = {}
        if (search) query = { $text: { $search: search } }
        const users = await this.#model.find(query, { __v: 0, otp: 0, updatedAt: 0, role: 0, })
        return users
    }
    async updateProfile(updateDto) {
        const { userId, firstname, lastname, username, birthday } = updateDto
        if (username) {
            const user = await this.#model.findOne({ username })
            if (user && user.username !== username) throw new createHttpError.Conflict(UserMessages.AlreadyExists)
        }
        let message = UserMessages.Update
        const updateResult = await this.#model.updateOne({ _id: userId }, { firstname, lastname, username, birthday })
        console.log(updateResult);
        if (updateResult.modifiedCount == 0) message = UserMessages.UpdateFailed
        return message
    }
}
module.exports = new UserService()