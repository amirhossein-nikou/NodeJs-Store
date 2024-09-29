const { Schema, model } = require("mongoose");

const PermissionSchema = new Schema({
    title: {type: String,required: true},
    description: {type: String,default:""},
},{toJSON:{virtuals: true},id: false})

const permissionModel = model("permission",PermissionSchema)
module.exports = {
    permissionModel
}