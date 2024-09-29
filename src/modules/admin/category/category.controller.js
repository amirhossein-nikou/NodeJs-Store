const createHttpError = require("http-errors");
const Controller = require("../../../controller");
const categoryService = require("./category.service");
const { CategoryMessages } = require("../../../common/enums/message.enum");

class CategoryController extends Controller {
    #service
    constructor() {
        super()
        this.#service = categoryService
    }

    async createCategory(req, res, next) {
        try {
            const { title, parent } = req.body
            const result = await categoryService.createCategory({ title, parent })
            res.status(201).json({
                data: {
                    status: 201,
                    message: CategoryMessages.Created
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findParents(req, res, next) {
        try {
            const result = await categoryService.findParent()
            res.status(200).json({
                data: {
                    status: 200,
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findChild(req, res, next) {
        try {
            const parentId = req.params.parentId
            const result = await categoryService.findChild(parentId)
            res.status(200).json({
                data: {
                    status: 200,
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findAll(req, res, next) {
        try {
            const result = await categoryService.findAll()
            res.status(200).json({
                data: {
                    status: 200,
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findById(req, res, next) {
        try {
            const id = req.params.id
            const result = await categoryService.findById(id)
            res.status(200).json({
                data: {
                    status: 200,
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const id = req.params.id
            const title = req.body.title
            const result = await categoryService.update({title,id})
            if(result.modifiedCount == 0) throw new createHttpError.InternalServerError("update failed")
            res.status(200).json({
                data: {
                    status: 200,
                    message: CategoryMessages.Update
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next) {
        try {
            const id = req.params.categoryId
            const result = await categoryService.removeCategory(id)
            res.status(200).json({
                data: {
                    status: 200,
                    message: CategoryMessages.Delete
                }
            })
        } catch (error) {
            next(error)
        }
    }

}
module.exports = new CategoryController()