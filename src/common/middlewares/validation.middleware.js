const { validationResult } = require("express-validator");
const { removeFile } = require("../utils/removeFile.utils");
function validationResultMiddleware(req, res, next) {
    const error = validationResult(req)
    const obj = {}
    // @ts-ignore
    error?.errors.forEach(err => {
        obj[err.path] = err.msg
    })
    if (Object.keys(obj).length > 0) {
        removeFile(req.body?.image || req.body?.images)
        throw {
            status: 400,
            error: obj,
            message: "Validation Error"
        }
    }
    next()
}
module.exports = {
    validationResultMiddleware
}