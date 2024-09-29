const { GraphQLString, GraphQLInt } = require("graphql");
const { ResultType } = require("../typeDefs/public.type");
const { validateAccessTokenInGraphQL } = require("../../common/middlewares/auth.middleware");
const { checkExistsProduct, checkExistsCourse } = require("../../common/utils/checkExists.utils");
const { productModel } = require("../../modules/admin/product/product.model");
const { userModel } = require("../../modules/admin/user/users.model");
const { copyObject } = require("../../common/utils/convertObject.utils");
const { StatusCodes } = require("http-status-codes");
const { AppMessages, ProductMessages, CourseMessages } = require("../../common/enums/message.enum");
const createHttpError = require("http-errors");

const AddProductToBasket = {
    type: ResultType,
    args: {
        productId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        const { productId } = args
        await checkExistsProduct(productId)
        const product = await getProductInBasket(user._id, productId)
        console.log(product);
        if (product || product !== undefined) {
            await userModel.updateOne({
                _id: user._id,
                "basket.products.productId": productId
            }, {
                $inc: {
                    "basket.products.$.count": 1
                }
            })
        } else {
            const result = await userModel.updateOne({
                _id: user._id,
            }, {
                $push: {
                    "basket.products": {
                        productId,
                        count: 1
                    }
                }
            })
            console.log(result);
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: ProductMessages.AddToBasket
            }
        }
    }
}
const AddCourseToBasket = {
    type: ResultType,
    args: {
        courseId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const { courseId } = args
        const user = req.user
        await checkExistsCourse(courseId)
        const course = await getCourseInBasket(user._id, courseId)
        if (course || course !== undefined) {
            throw new createHttpError.Conflict(CourseMessages.AlreadyExists)
        } else {
            const result = await userModel.updateOne({
                _id: user._id,
            }, {
                $push: {
                    "basket.courses": {
                        courseId,
                        count: 1
                    }
                }
            })
            console.log(result);
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: CourseMessages.AddToBasket
            }
        }
    }
}


const RemoveProductFromBasket = {
    type: ResultType,
    args: {
        productId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        const { productId } = args
        await checkExistsProduct(productId)
        let message;
        const product = await getProductInBasket(user._id, productId)
        if(!product) throw new createHttpError.NotFound(ProductMessages.NotFound)
        if (product.count > 1 ) {
            await userModel.updateOne({
                _id: user._id,
                "basket.products.productId": productId
            }, {
                $inc: {
                    "basket.products.$.count": -1
                }
            })
            message = ProductMessages.RemoveOneFromBasket
        } else {
            const result = await userModel.updateOne({
                _id: user._id,
                "basket.products.productId": productId
            }, {
                $pull: {
                    "basket.products": {
                        productId
                    }
                }
            })
            message = ProductMessages.RemoveFromBasket
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message
            }
        }
    }
}

const RemoveCourseFromBasket = {
    type: ResultType,
    args: {
        courseId: { type: GraphQLString },
    },
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const { courseId } = args
        const user = req.user
        await checkExistsCourse(courseId)
        const course = await getCourseInBasket(user._id, courseId)
        let message;
        if(!course)throw new createHttpError.NotFound(CourseMessages.NotFound)
        if (course.count > 1) {
            await userModel.updateOne({
                _id: user._id,
                "basket.courses.courseId": courseId
            }, {
                $inc: {
                    "basket.courses.$.count": -1
                }
            })
            message = CourseMessages.RemoveOneFromBasket
        } else {
            const result = await userModel.updateOne({
                _id: user._id,
                "basket.courses.courseId": courseId
            }, {
                $pull: {
                    "basket.courses": {
                        courseId,
                    }
                }
            })
            message = CourseMessages.RemoveFromBasket
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message
            }
        }
    }
}

async function getProductInBasket(userId, productId) {
    const basketProduct = await userModel.findOne({
        _id: userId,
        "basket.products.productId": productId
    })
    const product = copyObject(basketProduct)
    return product?.basket?.products?.[0]
}
async function getCourseInBasket(userId, courseId) {
    const basketCourse = await userModel.findOne({
        _id: userId,
        "basket.courses.courseId": courseId
    })
    const course = copyObject(basketCourse)
    return course?.basket?.courses?.[0]
}

module.exports = {
    AddCourseToBasket,
    AddProductToBasket,
    RemoveCourseFromBasket,
    RemoveProductFromBasket
}