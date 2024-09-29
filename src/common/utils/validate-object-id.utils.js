const createHttpError = require("http-errors")
const {isValidObjectId, Types} = require("mongoose")
function validateObjectId(id){
    if(!isValidObjectId(id)) throw new createHttpError.BadRequest("invalid object id")
    return id
}
module.exports = {validateObjectId}