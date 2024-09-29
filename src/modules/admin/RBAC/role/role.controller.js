const autoBind = require("auto-bind");
const roleService = require("./role.service");
const { StatusCodes } = require("http-status-codes");

class RoleController {
    #service
    constructor() {
        autoBind(this)
        this.#service = roleService
    }
    async getRoleList(req, res, next) {
        try {
            const roles = await this.#service.getRoleList()
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async createRole(req, res, next) {
        try {
            const message = await this.#service.createRole(req.body)
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeRole(req, res, next) {
        try {
            const { filed } = req.params
            const message = await this.#service.removeRole(filed)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: message
            })
        } catch (error) {
            next(error)
        }
    }
    async updateRole(req, res, next) {
        try {
            const { roleId } = req.params
            const message = await this.#service.updateRole({ roleId, ...req.body })
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: message
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RoleController()