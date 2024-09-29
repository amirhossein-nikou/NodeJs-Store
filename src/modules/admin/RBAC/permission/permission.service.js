const autoBind = require("auto-bind");
const { permissionModel } = require("./permission.model");
const createHttpError = require("http-errors");
const { RoleMessages, PermissionMessage } = require("../../../../common/enums/message.enum");
const { roleModel } = require("../role/role.model");

class PermissionService {
    #model
    #roleModel
    constructor() {
        autoBind(this)
        this.#model = permissionModel
        this.#roleModel = roleModel
    }
    async createPermission(createDto) {
        const { title, description } = createDto
        await this.checkExistsPermissionTitle(title)
        const permission = await this.#model.create({ title, description })
        if (!permission) throw new createHttpError.BadRequest(PermissionMessage.CreatedFailed)
        return PermissionMessage.Created
    }
    async getPermissionList() {
        const permissions = await this.#model.find({})
        if (permissions.length == 0) throw new createHttpError.NotFound(PermissionMessage.NotFound)
        return permissions
    }

    async removePermission(permissionId) {
        await this.getPermissionById(permissionId)
        const removeResult = await this.#model.deleteOne({ _id: permissionId })
        if (removeResult.deletedCount == 0) throw new createHttpError.InternalServerError(PermissionMessage.DeleteFailed)
        return PermissionMessage.Delete
    }
    async updatePermission(updateDto) {
        const { permissionId, title, description } = updateDto
        await this.getPermissionById(permissionId)
        const updateResult = await this.#model.updateOne({ _id: permissionId }, {
            title,
            description
        })
        if (permissionId.modifiedCount == 0) throw new createHttpError.InternalServerError(PermissionMessage.UpdateFailed)
        return PermissionMessage.Update
    }
    async getPermissionById(permissionId) {
        const perm = await this.#model.findOne({ _id: permissionId })
        if (!perm) throw new createHttpError.Conflict(PermissionMessage.NotFound)
        return perm
    }
    async checkExistsPermissionTitle(title) {
        const perm = await this.#model.findOne({ title })
        if (perm) throw new createHttpError.Conflict(PermissionMessage.AlreadyExists)
        return true
    }
}
module.exports = new PermissionService()