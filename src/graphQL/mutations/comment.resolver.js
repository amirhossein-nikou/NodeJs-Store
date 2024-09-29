const { GraphQLString } = require("graphql");
const { ResultType } = require("../typeDefs/public.type");
const { validateAccessTokenInGraphQL } = require("../../common/middlewares/auth.middleware");
const { StatusCodes } = require("http-status-codes");
const { commentMessage, ProductMessages, CourseMessages, BlogMessages } = require("../../common/enums/message.enum");
const { blogModel } = require("../../modules/admin/blog/blog.model");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const { productModel } = require("../../modules/admin/product/product.model");
const { courseModel } = require("../../modules/admin/course/course.model");
const { checkExistsCourse, checkExistsProduct, checkExistsBlog } = require("../../common/utils/checkExists.utils");

const CreateCommentForBlog = {
    type: ResultType,
    args: {
        comment: { type: GraphQLString },
        blogId: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        const { blogId, comment, parent } = args
        await checkExistsBlog(blogId)
        if (parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getOneComment(blogModel, parent)
            if (commentDocument && !commentDocument.openToReply) throw new createHttpError.BadRequest(commentMessage.ReplyError)
            const answerResult = await blogModel.updateOne({ _id: blogId , "comment._id": parent},
                {
                    $push: {
                        "comment.$.answer": {
                            comment,
                            user: user._id,
                            openToReply: false,
                            show: false
                        }
                    }
                }
            )
            if (!answerResult.modifiedCount) throw new createHttpError.InternalServerError(commentMessage.AnswerFailed)
            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    message: commentMessage.AnswerCreated
                }
            }
        } else {
            const result = await blogModel.updateOne({ _id: blogId },
                {
                    $push: {
                        comment: {
                            comment,
                            user: user._id,
                            openToReply: true,
                            show: false
                        }
                    }
                }
            )
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: commentMessage.Created
            }
        }
    }
}
const CreateCommentForProduct = {
    type: ResultType,
    args: {
        comment: { type: GraphQLString },
        productId: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        const { productId, comment, parent } = args
        await checkExistsProduct(productId)
        console.log(parent);
        if (parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getOneComment(productModel, parent)
            if (commentDocument && !commentDocument.openToReply) throw new createHttpError.BadRequest(commentMessage.ReplyError)
            const answerResult = await productModel.updateOne({ _id: productId , "comment._id": parent},
                {
                    $push: {
                        "comment.$.answer": {
                            comment,
                            user: user._id,
                            openToReply: false,
                            show: false
                        }
                    }
                }
            )
            if (!answerResult.modifiedCount) throw new createHttpError.InternalServerError(commentMessage.AnswerFailed)
            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    message: commentMessage.AnswerCreated
                }
            }
        } else {
            const result = await productModel.updateOne({ _id: productId },
                {
                    $push: {
                        comment: {
                            comment,
                            user: user._id,
                            openToReply: true,
                            show: false
                        }
                    }
                }
            )
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: commentMessage.Created
            }
        }
    }
}
const CreateCommentForCourse = {
    type: ResultType,
    args: {
        comment: { type: GraphQLString },
        courseId: { type: GraphQLString },
        parent: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        const { courseId, comment, parent } = args
        await checkExistsCourse(courseId)
        if (parent && mongoose.isValidObjectId(parent)) {
            const commentDocument = await getOneComment(courseModel, parent)
            if (commentDocument && !commentDocument.openToReply) throw new createHttpError.BadRequest(commentMessage.ReplyError)
            const answerResult = await courseModel.updateOne({ _id: courseId , "comment._id": parent},
                {
                    $push: {
                        "comment.$.answer": {
                            comment,
                            user: user._id,
                            openToReply: false,
                            show: false
                        }
                    }
                }
            )
            if (!answerResult.modifiedCount) throw new createHttpError.InternalServerError(commentMessage.AnswerFailed)
            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    message: commentMessage.AnswerCreated
                }
            }
        } else {
            const result = await courseModel.updateOne({ _id: courseId },
                {
                    $push: {
                        comment: {
                            comment,
                            user: user._id,
                            openToReply: true,
                            show: false
                        }
                    }
                }
            )
            if (!result.modifiedCount) throw new createHttpError.InternalServerError(commentMessage.AnswerFailed)
        }
        return {
            statusCode: StatusCodes.CREATED,
            data: {
                message: commentMessage.Created
            }
        }
    }
}
async function getOneComment(model, id) {
    const findComment = await model.findOne({ "comment._id": id }, { "comment.$": 1 })
    if (!findComment?.comment?.[0]) throw new createHttpError.NotFound(commentMessage.NotFound)
    return findComment?.comment?.[0]
}

module.exports = {
    CreateCommentForBlog,
    CreateCommentForProduct,
    CreateCommentForCourse,
}