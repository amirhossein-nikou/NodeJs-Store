const createHttpError = require("http-errors")
const { UserMessages } = require("../enums/message.enum")
const { roleModel } = require("../../modules/admin/RBAC/role/role.model")
const { permissionModel } = require("../../modules/admin/RBAC/permission/permission.model")
const { permissionsEnum } = require("../enums/role.enum")

function checkPermission(requiredPermissions = []) {
    return async function (req, res, next) {
        try {
            const allPermission = requiredPermissions.flat(2)
            const userRole = req.user.role
            const role = await roleModel.findOne({ title: userRole })
            const permissions = await permissionModel.find({ _id: { $in: role.permission } })
            const userPermission = permissions.map(perm => perm.title)
            const hasPermission = allPermission.every(permission => {
                console.log(permission);
                return userPermission.includes(permission)
            })
            if(userPermission.includes(permissionsEnum.ALL)) return next()
            if (allPermission.length === 0 || hasPermission) return next()
            throw new createHttpError.Forbidden(UserMessages.RoleError)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    checkPermission
}