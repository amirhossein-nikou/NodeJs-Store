const autoBind = require("auto-bind");
const userService = require("./user.service");
const { StatusCodes } = require("http-status-codes");

class UserController{
    #service
    constructor(){
        autoBind(this)
        this.#service = userService
    }
    async getAllUsers(req,res,next){
        try {
            const {search} = req.query
            const users = await this.#service.getAllUsers(search)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateProfile(req,res,next){
        try {
            const userId = req.user._id
            const message = await this.#service.updateProfile({userId,...req.body})
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message
                }
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async userProfile(req,res,next){
        try {
            const user = req.user
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    user
                }
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new UserController()