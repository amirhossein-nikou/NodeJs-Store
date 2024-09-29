const autoBind = require("auto-bind");
const { blogModel } = require("./blog.model");
const categoryService = require("../category/category.service");
const createHttpError = require("http-errors");
const { BlogMessages } = require("../../../common/enums/message.enum");
const { Types } = require("mongoose");

class BlogService {
    #model
    #categoryService
    constructor() {
        autoBind(this)
        this.#model = blogModel
        this.#categoryService = categoryService
    }
    async findBlogs(userId) {
        return this.#model.find({author: userId}).populate([{path : "category", select : ['title']}, {path: "author", select : ['mobile', 'first_name', 'last_name', 'username']}]);
    }
    async findById(id) {
        const blog = await this.checkExistsById(id)
        return blog
    }
    async remove(id) {
        const blog = await this.#model.deleteOne({_id: id})
        if(blog.deletedCount == 0) throw new createHttpError.BadRequest(BlogMessages.RemoveFailed)
        return blog
    }
    async create(createDto) {
        await this.#categoryService.checkExistsCategory(createDto?.category)
        return this.#model.create(createDto)
    }
    async update(updateDto) {
        if(updateDto.category){
            await this.#categoryService.checkExistsCategory(updateDto?.category)
        }
        await this.checkExistsById(updateDto?.id)
        const result =await this.#model.updateOne({_id: updateDto.id},updateDto)
        if(result.modifiedCount == 0) throw new createHttpError.InternalServerError()
        return result
    }
    async checkExistsById(id) {
        const blog = await this.#model.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$author"
            },
            {
                $unwind: "$category"
            },
            {
                $project: {
                    "author.otp": 0,
                    "author.role": 0,
                    "author.verifyPhone": 0,
                    "author.bills": 0,
                    "author.discount": 0,
                    "author.updatedAt": 0,
                    "author.createdAt": 0,
                    "author.__v": 0,
                    "category.__v": 0,
                    
                }
            },
            {
                $addFields: {
                    "imageURL":{$concat: [`${process.env.HOST}:${process.env.PORT}/` ,"$image"]} //`${process.env.HOST}:${process.env.PORT}/` + "$image"
                }
            }
        ])
        if (!blog || blog.length <= 0) throw new createHttpError.NotFound(BlogMessages.NotFound)
        return blog
    }
}
module.exports = new BlogService