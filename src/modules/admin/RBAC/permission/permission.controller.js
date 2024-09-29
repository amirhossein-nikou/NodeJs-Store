const autoBind = require("auto-bind");
const permissionService = require("./permission.service");
const { StatusCodes } = require("http-status-codes");

class PermissionController{
    #service
    constructor(){
        autoBind(this)
        this.#service = permissionService
    }
    async getPermissionList(req,res,next){
        try {
            const permissions = await this.#service.getPermissionList()
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: permissions
            })
        } catch (error) {
            next(error)
        }
    }
    async createPermission(req,res,next){
        try {
            const permissions = await this.#service.createPermission(req.body)
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: permissions
            })
        } catch (error) {
            next(error)
        }
    }
    async removePermission(req,res,next){
        try {
            const {permissionId} = req.params
            const message = await this.#service.removePermission(permissionId)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: message
            })
        } catch (error) {
            next(error)
        }
    }
    async updatePermission(req,res,next){
        try {
            const {permissionId} = req.params
            const message = await this.#service.updatePermission({permissionId, ...req.body})
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: message
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PermissionController()