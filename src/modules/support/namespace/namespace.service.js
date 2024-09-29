const autoBind = require("auto-bind");
const { conversationModel } = require("../conversation.model");
const { SupportMessages } = require("../../../common/enums/message.enum");
const createHttpError = require("http-errors");

class NamespaceService{
    #model
    constructor(){
        autoBind(this)
        this.#model = conversationModel
    }
    async addNamespace(createDto){
        const {title,endpoint} = createDto
        await this.existsNamespace(endpoint)
        const conversation = await this.#model.create({title,endpoint})
        return {
            message: SupportMessages.CreatedNamespace
        }
    }
     async getNamespaceList(createDto){
        const conversations = await this.#model.find({},{rooms: 0})
        return {
            conversations
        }
    }
    async existsNamespace(endpoint){
        const conversation = await this.#model.findOne({endpoint})
        if(conversation) throw new createHttpError.BadRequest(SupportMessages.AlreadyExists)
    }
}

module.exports = new NamespaceService()