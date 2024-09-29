const { GraphQLString } = require("graphql");
const { ResultType } = require("../typeDefs/public.type");
const { validateAccessTokenInGraphQL } = require("../../common/middlewares/auth.middleware");
const { blogModel } = require("../../modules/admin/blog/blog.model");
const { StatusCodes } = require("http-status-codes");
const { AppMessages } = require("../../common/enums/message.enum");
const { courseModel } = require("../../modules/admin/course/course.model");
const { productModel } = require("../../modules/admin/product/product.model");
const { checkExistsCourse, checkExistsProduct, checkExistsBlog } = require("../../common/utils/checkExists.utils");

const DisLikeBlog = {
    type: ResultType,
    args: {
        blogId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { blogId } = args
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        await checkExistsBlog(blogId)
        return await DisLike(blogModel, blogId, user._id)
    }
}
const DisLikeProduct = {
    type: ResultType,
    args: {
        productId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { productId } = args
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        await checkExistsProduct(productId)
        return await DisLike(productModel, productId, user._id)
    }
}
const DisLikeCourse = {
    type: ResultType,
    args: {
        courseId: { type: GraphQLString }
    },
    resolve: async (_, args, context) => {
        const { courseId } = args
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        await checkExistsCourse(courseId)
        return await DisLike(courseModel, courseId, user._id)
    }
}

async function DisLike(model, modelId, userId) {
    let message = AppMessages.DisLiked
    const likeBlog = await model.findOne({
        _id: modelId,
        like: userId
    })
    const disLikeBlog = await model.findOne({
        _id: modelId,
        dislike: userId
    })
    let updateQuery
    if (disLikeBlog) {
        updateQuery = { $pull: { dislike: userId } }
        message = AppMessages.DisLikedRemove
    } else {
        updateQuery = { $push: { dislike: userId } }
    }
    await model.updateOne({ _id: modelId }, updateQuery)
    if (likeBlog) {
        await model.updateOne({ _id: modelId }, { $pull: { like: userId } })
    }
    return {
        statusCode: StatusCodes.OK,
        data: {
            message
        }
    }
}


module.exports = {
    DisLikeBlog,
    DisLikeProduct,
    DisLikeCourse
}