const autoBind = require("auto-bind")
const productService = require("./product.service")
const { removeFile } = require("../../../common/utils/removeFile.utils")
const { ProductMessages } = require("../../../common/enums/message.enum")
const { genImageList } = require("../../../common/utils/imageList.utils")
const { StatusCodes } = require("http-status-codes")
const { productModel } = require("./product.model")
class ProductController {
    #service
    constructor() {
        autoBind(this)
        this.#service = productService
    }
    async getProduct(req, res, next) {
        try {
            const supplier = req.user._id
            const search = req.query.search
            const result = await this.#service.getProduct(supplier, search);
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
    async create(req, res, next) {
        try {
            const supplier = req.user?._id
            req.body.images = genImageList(req.files, req.body.imagePath)
            const createDto = req.body
            const result = await this.#service.create({ ...createDto, supplier })
            res.status(StatusCodes.CREATED).json({
                data: {
                    status: StatusCodes.CREATED,
                    message: ProductMessages.Created
                }
            })
        } catch (error) {
            removeFile(req.body.images)
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const supplier = req.user._id
            const id = req.params.id
            const product = await this.#service.getProductById(id, supplier)
            res.status(StatusCodes.OK).json({
                data: {
                    status: StatusCodes.OK,
                    product
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const supplier = req.user._id
            req.body.images = genImageList(req.files, req.body.imagePath)
            if (req.body.images.length > 0) {
                const product = await this.#service.getProductById(req.body.productId)
                removeFile(product.images)
            }
            const result = await this.#service.updateProduct({ supplier, ...req.body })
            res.status(result.status).send({
                statusCode: result.status,
                data: {
                    message: result.message
                }
            }
            )
        } catch (error) {
            removeFile(req.body?.images)
            next(error)
        }
    }
    async delete(req, res, next) {
        try {
            const supplier = req.user._id
            const id = req.params.id
            const result = await this.#service.deleteProduct(id, supplier)
            return res.status(StatusCodes.OK).json({
                data: {
                    status: StatusCodes.OK,
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new ProductController()