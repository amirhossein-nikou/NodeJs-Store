const autoBind = require("auto-bind");
const { categoryModel } = require("./categories.model");
const createHttpError = require("http-errors");
const { CategoryMessages } = require("../../../common/enums/message.enum");
class CategoryService {
    #model
    constructor() {
        autoBind(this)
        this.#model = categoryModel
    }
    async createCategory(categoryDto) {
        const category = await this.#model.create(categoryDto)
        return category
    }
    async findParent() {
        return this.#model.find({ parent: undefined }, { __v: 0 })
    }
    async findChild(parentId) {
        await this.checkExistsCategory(parentId)
        return this.#model.find({ parent: parentId }, { __v: 0, parent: 0 })
    }
    async findAll() {
        return this.#model.find({parent: undefined})
    }
    async findById(id){
        await this.checkExistsCategory(id);
        return this.#model.findOne({_id: id})
        
    }
    async removeCategory(categoryId) {
        const category = await this.checkExistsCategory(categoryId)
        // const children = await this.findChild(categoryId)
        // if(children.length > 0){
        //     children.forEach(async (child) => {
        //         await this.#model.deleteOne({_id: child._id})
        //     });
        // }
        return this.#model.deleteMany({
            $or: [
                { _id: categoryId },
                { parent: categoryId }
            ]
        })

    }
    async update(updateDto){
        const {id, title} = updateDto;
        await this.checkExistsCategory(id)
        console.log(updateDto);
        return this.#model.updateOne({_id:id},{title})
    }
    async checkExistsCategory(id) {
        const category = await this.#model.findById(id)
        if (!category) throw new createHttpError.NotFound(CategoryMessages.NotFound);
        return category
    }
}

module.exports = new CategoryService()
