const { GraphQLString } = require("graphql");
const { ResultType } = require("../typeDefs/public.type");
const { validateAccessTokenInGraphQL } = require("../../common/middlewares/auth.middleware");
const { blogModel } = require("../../modules/admin/blog/blog.model");
const { StatusCodes } = require("http-status-codes");
const { AppMessages } = require("../../common/enums/message.enum");
const { courseModel } = require("../../modules/admin/course/course.model");
const { productModel } = require("../../modules/admin/product/product.model");
const { checkExistsBlog, checkExistsProduct, checkExistsCourse } = require("../../common/utils/checkExists.utils");

const LikeBlog = {
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
        return await Like(blogModel, blogId, user._id)

    }
}
const LikeProduct = {
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
        return await Like(productModel, productId, user._id)

    }
}
const LikeCourse = {
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
        return await Like(courseModel, courseId, user._id)

    }
}

async function Like(model, modelId, userId) {
    let message = AppMessages.Liked
    const likeBlog = await model.findOne({
        _id: modelId,
        like: userId
    })
    const disLikeBlog = await model.findOne({
        _id: modelId,
        dislike: userId
    })
    let updateQuery
    if (likeBlog) {
        updateQuery = { $pull: { like: userId } }
        message = AppMessages.LikeRemove
    } else {
        updateQuery = { $push: { like: userId } }
    }
    await model.updateOne({ _id: modelId }, updateQuery)
    if (disLikeBlog) {
        await model.updateOne({ _id: modelId }, { $pull: { dislike: userId } })
    }
    return {
        statusCode: StatusCodes.OK,
        data: {
            message
        }
    }
}


module.exports = {
    LikeBlog,
    LikeProduct,
    LikeCourse
}