const { Schema, Types, model } = require("mongoose");

const commentSchema = new Schema({
    user: { type: Types.ObjectId ,ref: "user",require: true},
    comment: { type: String, require: true },
    show: { type: Boolean, default: false },
    openToReply: { type: Boolean, default: true },
    parent: { type: Types.ObjectId ,ref: "comment"}
},{
    timestamps: {createdAt: true}
})
const commentModel = model('comment',commentSchema)
module.exports = {
    commentModel
}