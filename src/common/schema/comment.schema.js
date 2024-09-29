const { Schema, Types, model } = require("mongoose");
const commentAnswerSchema = new Schema({
    user: { type: Types.ObjectId, ref: "user", require: true },
    comment: { type: String, require: true },
    show: { type: Boolean, default: false },
    openToReply: { type: Boolean, default: false },
}, {
    timestamps: { createdAt: true }
})
const commentSchema = new Schema({
    user: { type: Types.ObjectId, ref: "user", require: true },
    comment: { type: String, require: true },
    show: { type: Boolean, default: false },
    openToReply: { type: Boolean, default: true },
    answer: { type: [commentAnswerSchema], default: []  }
}, {
    timestamps: { createdAt: true }
})

module.exports = {
    commentSchema,
    commentAnswerSchema
}