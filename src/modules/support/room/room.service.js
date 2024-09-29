const autoBind = require("auto-bind");
const { conversationModel } = require("../conversation.model");
const { SupportMessages } = require("../../../common/enums/message.enum");
const createHttpError = require("http-errors");

class RoomService {
    #model
    constructor() {
        autoBind(this)
        this.#model = conversationModel
    }
    async addRoom(createDto) {
        const { name, namespace, description, image } = createDto
        
        await this.checkExistsNamespace(namespace)
        const conversation = await this.#model.updateOne({ endpoint: namespace }, {
            $push: {
                rooms: {
                    name,
                    description,
                    image
                }
            }
        })
        return {
            message: SupportMessages.CreatedRoom
        }
    }
    async getRoomList(createDto) {
        const conversations = await this.#model.find({}, { rooms: 0 })
        return {
            conversations
        }
    }
    async existsRoom(name,endpoint){
        const conversation = await this.#model.findOne({endpoint,"room.name": name})
        if(conversation) throw new createHttpError.BadRequest(SupportMessages.AlreadyExists)
    }
    async checkExistsNamespace(endpoint) {
        const conversation = await this.#model.findOne({ endpoint })
        if (!conversation) throw new createHttpError.BadRequest(SupportMessages.NotFound)
        return conversation
    }
}

module.exports = new RoomService()