const { Schema, model, Types } = require("mongoose");

const RoleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: ""},
    permission: { type: [Types.ObjectId],ref:"permission", default: [] },
}, { toJSON: { virtuals: true }, id: false })

const roleModel = model("role", RoleSchema)
module.exports = {
    roleModel
}