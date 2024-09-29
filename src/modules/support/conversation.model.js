const { Schema, Types, model } = require("mongoose");
const messageSchema = new Schema({
    sender: { type: Types.ObjectId, ref: "user" },
    message: { type: String },
    dateTime: { type: String },
})
const LocationSchema = new Schema({
    sender: { type: Types.ObjectId, ref: "user" },
    message: { type: String },
    dateTime: { type: String },
})
const roomSchema = new Schema({
    name: { type: String },
    description: { type: String },
    image: { type: String },
    message: { type: [messageSchema], default: [] },
    location: { type: [LocationSchema], default: [] }
})
const ConversationSchema = new Schema({
    title: { type: String, require: true },
    endpoint: { type: String, require: true },
    rooms: { type: [roomSchema], default: [] }
})
const conversationModel = model("conversation", ConversationSchema)
module.exports = {
    conversationModel
}