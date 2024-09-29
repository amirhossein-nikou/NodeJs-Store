const autoBind = require("auto-bind");
const { roleModel } = require("./role.model");
const createHttpError = require("http-errors");
const { RoleMessages, ValidationMessages } = require("../../../../common/enums/message.enum");
const { default: mongoose } = require("mongoose");

class RoleService {
    #model
    constructor() {
        autoBind(this)
        this.#model = roleModel
    }
    async getRoleList() {
        const roles = await this.#model.find({}).populate([{ path: "permission" }])
        if (roles.length == 0) throw new createHttpError.NotFound(RoleMessages.NotFound)
        return roles
    }
    async createRole(createDto) {
        const { title, permission } = createDto
        console.log(permission);
        permission.map(perm => {
            if (!mongoose.isValidObjectId(perm)) throw new createHttpError.Unauthorized(ValidationMessages.Format)
        })
        await this.checkExistsRoleTitle(title)
        const role = await this.#model.create({ title, permission })
        if (!role) throw new createHttpError.BadRequest(RoleMessages.CreatedFailed)
        return RoleMessages.Created
    }
    async removeRole(filed) {
        const query = mongoose.isValidObjectId(filed) ? { _id: filed } : { title: filed }
        const removeResult = await this.#model.deleteOne(query)
        if (removeResult.deletedCount == 0) throw new createHttpError.InternalServerError(RoleMessages.RemoveFailed)
        return RoleMessages.Delete
    }
    async updateRole(updateDto) {
        let { title, description, permission, roleId } = updateDto
        const role = await this.findRole(roleId)
        if (permission.length == 0) permission = role.permission
        const updateResult = await this.#model.updateOne({ _id: roleId }, {
            title, description, permission
        })
        if(updateResult.modifiedCount == 0) throw new createHttpError.InternalServerError(RoleMessages.UpdateFailed)
        return RoleMessages.Update
    }
    async findRole(id) {
        const role = await this.#model.findById(id)
        if (!role) throw new createHttpError.NotFound(RoleMessages.NotFound)
        return role
    }
    async checkExistsRoleTitle(title) {
        const role = await this.#model.findOne({ title })
        if (role) throw new createHttpError.Conflict(RoleMessages.AlreadyExists)
        return true
    }
}
module.exports = new RoleService()