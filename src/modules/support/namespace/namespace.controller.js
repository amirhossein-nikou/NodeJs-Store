const autoBind = require("auto-bind");
const { conversationModel } = require("../conversation.model");
const NamespaceService = require("./namespace.service");
const { StatusCodes } = require("http-status-codes");

class NamespaceController{
    #service
    constructor(){
        autoBind(this)
        this.#service = NamespaceService
    }
    async addNamespace(req,res,next){
        try {
            const result = await this.#service.addNamespace(req.body)
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
    async getNamespaceList(req,res,next){
        try {
            const result = await this.#service.getNamespaceList()
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new NamespaceController()