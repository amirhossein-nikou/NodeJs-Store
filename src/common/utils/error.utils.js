const httpError = require("http-errors")
const { AppMessages } = require("../enums/message.enum")
function NotfoundError(req,res,next){
    res.json(new httpError.NotFound(AppMessages.RouteNotFound))
}
function ErrorHandler(err,req,res,next){
    const serverError = httpError.InternalServerError()
    const status = err?.status || err?.statusCode || serverError.statusCode
    const message = err?.message || serverError.message
    res.status(status).json({
        errors:{
            status,
            message,
            error: err?.error
        }
    })
}
module.exports = {
    NotfoundError,
    ErrorHandler
}