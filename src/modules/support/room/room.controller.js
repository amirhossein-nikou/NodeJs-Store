const autoBind = require("auto-bind");
const { StatusCodes } = require("http-status-codes");
const roomService = require("./room.service");

class RoomController{
    #service
    constructor(){
        autoBind(this)
        this.#service = roomService
    }
    async addRoom(req,res,next){
        try {
            const result = await this.#service.addRoom(req.body)
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
    async getRoomList(req,res,next){
        try {
            const result = await this.#service.getRoomList()
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: result
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RoomController()