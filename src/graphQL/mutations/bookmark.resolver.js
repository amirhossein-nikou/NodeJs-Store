const { GraphQLString } = require("graphql");
const { ResultType } = require("../typeDefs/public.type");
const { validateAccessTokenInGraphQL } = require("../../common/middlewares/auth.middleware");
const { blogModel } = require("../../modules/admin/blog/blog.model");
const { StatusCodes } = require("http-status-codes");
const { AppMessages } = require("../../common/enums/message.enum");
const { courseModel } = require("../../modules/admin/course/course.model");
const { productModel } = require("../../modules/admin/product/product.model");
const { checkExistsCourse, checkExistsProduct, checkExistsBlog } = require("../../common/utils/checkExists.utils");

const BookmarkBlog = {
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
        return await Bookmark(blogModel, blogId, user._id)
        
    }
}
const BookmarkProduct = {
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
        return await Bookmark(productModel, productId, user._id)
        
    }
}
const BookmarkCourse = {
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
        return await Bookmark(courseModel, courseId, user._id)
        
    }
}

async function Bookmark(model, modelId, userId) {
    let message = AppMessages.Bookmark
    const bookmarkResult = await model.findOne({
        _id: modelId,
        bookmark: userId
    })
    let updateQuery
    if (bookmarkResult) {
        updateQuery = { $pull: { bookmark: userId } }
        message = AppMessages.BookmarkRemove
    } else {
        updateQuery = { $push: { bookmark: userId } }
    }
    await model.updateOne({ _id: modelId }, updateQuery)
    return {
        statusCode: StatusCodes.OK,
        data: {
            message
        }
    }
}


module.exports = {
    BookmarkBlog,
    BookmarkProduct,
    BookmarkCourse
}