const { GraphQLList } = require("graphql");
const { BlogType } = require("../typeDefs/blog.type");
const { validateAccessTokenInGraphQL } = require("../../common/middlewares/auth.middleware");
const { blogModel } = require("../../modules/admin/blog/blog.model");
const { courseModel } = require("../../modules/admin/course/course.model");
const { CourseType } = require("../typeDefs/course.type");
const { ProductType } = require("../typeDefs/product.type");
const { productModel } = require("../../modules/admin/product/product.model");
const { AnyType } = require("../typeDefs/public.type");
const { getUserBasket } = require("../../common/utils/basket.utils");

const getBookmarkedBlogs = {
    type: new GraphQLList(BlogType),
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        const blogs = await blogModel.find({ bookmark: user._id }).populate([
            { path: "author" },
            { path: "category" },
            { path: "comment.user" },
            { path: "comment.answer.user" },
            { path: "like" },
            { path: "bookmark" },
        ])
        return blogs
    }
}
const getBookmarkedProducts = {
    type: new GraphQLList(ProductType),
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        const products = await productModel.find({ bookmark: user._id }).populate([
            { path: "supplier" },
            { path: "category" },
            { path: "comment.user" },
            { path: "comment.answer.user" },
            { path: "like" },
            { path: "bookmark" },
        ])
        return products
    }
}
const getBookmarkedCourses = {
    type: new GraphQLList(CourseType),
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const user = req.user
        const courses = await courseModel.find({ bookmark: user._id }).populate([
            { path: "teacher" },
            { path: "category" },
            { path: "comment.user" },
            { path: "comment.answer.user" },
            { path: "like" },
            { path: "bookmark" },
        ])
        return courses
    }
}
const getBasketDetails = {
    type: AnyType,
    resolve: async (_, args, context) => {
        const { req } = context
        await validateAccessTokenInGraphQL(req)
        const userId = req.user._id
        const basket = await getUserBasket(userId)
        return basket
    }
}
module.exports = {
    getBookmarkedBlogs,
    getBookmarkedCourses,
    getBookmarkedProducts,
    getBasketDetails
}
