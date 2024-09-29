const autoBind = require("auto-bind")
const { productModel } = require("./product.model")
const createHttpError = require("http-errors")
const { ValidationMessage, ProductMessages } = require("../../../common/enums/message.enum")
const { removeFile } = require("../../../common/utils/removeFile.utils")
const categoryService = require("../category/category.service")
const { validateObjectId } = require("../../../common/utils/validate-object-id.utils")
const { Types } = require("mongoose")
const { StatusCodes } = require("http-status-codes")

class ProductService {
    #model
    #categoryService
    constructor() {
        autoBind(this)
        this.#model = productModel
        this.#categoryService = categoryService
    }
    async create(createDto) {
        const { supplier, title, description, shortDesc, tags, images, category,
            price, count, discount, type } = createDto
        await this.#categoryService.checkExistsCategory(category)
        const feature = this.createFeature(createDto)
        const product = await this.#model.create({
            supplier, title, description, shortDesc, tags, images, category
            , price, count, discount, type, feature
        });
        return product
    }
    async getProduct(supplier, search) {
        let query = {}
        if (search) {
            query = {
                supplier,
                $text: {
                    $search: search
                }
            }
        } else { query = { supplier } }
        return this.#model.find(query)
    }
    async getProductById(id, supplier) {
        //check id
        validateObjectId(id)
        const validSupplierId = validateObjectId(supplier)
        const product = await this.#model.findById(id)
        const productSupplier = product.supplier
        if (!product || productSupplier.toString() != supplier) throw new createHttpError.NotFound(ProductMessages.NotFound)
        return product
    }
    // delete need some changes e.g -> check product is porches by anyone or not 
    async deleteProduct(id, supplier) {
        await this.getProductById(id, supplier)
        const result = await this.#model.deleteOne({ _id: id })
        if (result.deletedCount == 0) throw new createHttpError.NotFound(ProductMessages.RemoveFailed)
        return {
            message: ProductMessages.Delete
        }
    }
    async updateProduct(updateDto) {
        let { productId, title, description, shortDesc, tags, images, category
            , price, count, discount, type, supplier } = updateDto
        if (category) await this.#categoryService.checkExistsCategory(category)
        const product = await this.getProductById(productId, supplier)
        const feature = this.updateFeature(updateDto, product)
        if (tags.length == 0) tags = product.tags
        if (images.length == 0) images = product.images
        const result = await this.#model.updateOne({ _id: productId },
            {
                productId, title, description, shortDesc, tags, images, category
                , price, count, discount, type, feature
            }
        )
        let status = StatusCodes.BAD_REQUEST
        let message = ProductMessages.UpdateFailed


        if (result.modifiedCount != 0) {
            status = StatusCodes.OK
            message = ProductMessages.Update
        }

        return { message, status }
    }

    // create and update features for physical product
    updateFeature(dto, product) {
        const { color, weight, length, width, height, type } = dto
        let feature = {}
        if (color.length > 0) {
            color.map(item => {
                const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
                if (!hexRegex.test(item)) throw new createHttpError.BadRequest(ProductMessages.ColorFormat)
            })
        }
        if (type == "physical") {
            feature = {
                weight,
                height,
                length,
                width,
                color,
            }
            const nullData = ["", " ", null, undefined, "0", 0]
            Object.keys(feature).forEach(key => {
                if (Array.isArray(feature[key]) && feature[key].length == 0) feature[key] = product.feature[key]
                if (nullData.includes(feature[key])) {
                    if (product.feature[key] == null) throw new createHttpError.BadRequest(key + " can not update with null value")
                    feature[key] = product.feature[key]
                }
            })
        }
        return feature
    }
    createFeature(dto) {
        const { color, weight, length, width, height, type } = dto
        let feature = {}
        if (type === "physical") {
            this.validateFeatureForCreate({ color, weight, length, width, height })
            feature = {
                weight,
                height,
                length,
                width,
                color,
            }
        }
        return feature
    }
    validateFeatureForCreate(feature = {}) {
        feature.color.map(item => {
            const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
            if (!hexRegex.test(item)) throw new createHttpError.BadRequest(ProductMessages.ColorFormat)
        })
        const nullData = ["", " ", null, undefined, "0", 0]
        Object.keys(feature).forEach(key => {
            if (Array.isArray(feature[key]) && feature[key].length == 0) throw new createHttpError.BadRequest(`${key} ${ProductMessages.RequiredFiled}`)
            if (nullData.includes(feature[key])) {
                throw new createHttpError.BadRequest(`${key} ${ProductMessages.RequiredFiled}`)
            }
        })
    }
}

module.exports = new ProductService()