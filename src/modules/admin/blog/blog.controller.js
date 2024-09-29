const autoBind = require("auto-bind");
const { blogModel } = require("./blog.model");
const blogService = require("./blog.service");
const { removeFile } = require("../../../common/utils/removeFile.utils");
const { BlogMessages } = require("../../../common/enums/message.enum");

class BlogController{
    #service
    constructor(){
        autoBind(this)
        this.#service = blogService
    }
    async findBlogs(req,res,next){
        try {
            const userId = req.user?._id
            const result = await this.#service.findBlogs(userId)
            res.status(200).json({
                data:{
                    status: 200,
                    result
                }
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async create(req,res,next){
        try {
            const author = req.user?._id
            const {title,image,text,short_text,category,tags} = req.body
            const blog = await this.#service.create({title,image,text,short_text,category,tags,author})
            res.status(201).json({
                data:{
                    status: 201,
                    message: BlogMessages.Created
                }
            })
        } catch (error) {
            removeFile(req.body.image)
            next(error)
        }
    }
    async findById(req,res,next){
        try {
            console.log(req.params.id);
            const id = req.params.id
            const result = await this.#service.findById(id)
            res.status(200).json({
                data:{
                    status: 200,
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req,res,next){
        try {
            console.log(req.params.id);
            const id = req.params.id
            const result = await this.#service.remove(id)
            res.status(200).json({
                data:{
                    status: 200,
                    message: BlogMessages.Delete
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async update(req,res,next){
        try {
            const author = req.user?._id
            const {id,title,image,text,short_text,category,tags} = req.body
            if(req.body.image){
                const blog = await this.#service.findById(id)
                removeFile(blog[0].image)
            }
            const blog = await this.#service.update({id,title,image,text,short_text,category,tags,author})
            res.status(201).json({
                data:{
                    status: 201,
                    message: BlogMessages.Update
                }
            })
        } catch (error) {
            removeFile(req.body.image)
            next(error)
        }
    }
}
module.exports = new BlogController