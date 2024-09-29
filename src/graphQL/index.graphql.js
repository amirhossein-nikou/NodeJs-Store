const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoriesResolver, CategoryChildrenResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CreateCommentForBlog, CreateCommentForCourse, CreateCommentForProduct } = require("./mutations/comment.resolver");
const { LikeBlog, LikeProduct, LikeCourse } = require("./mutations/like.resolver");
const { DisLikeCourse, DisLikeProduct, DisLikeBlog } = require("./mutations/disLike.resolver");
const { BookmarkCourse, BookmarkProduct, BookmarkBlog } = require("./mutations/bookmark.resolver");
const { getBookmarkedBlogs, getBookmarkedCourses, getBookmarkedProducts, getBasketDetails } = require("./queries/user-profile.resolver");
const { RemoveProductFromBasket, RemoveCourseFromBasket, AddProductToBasket, AddCourseToBasket } = require("./mutations/basket.resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoriesResolver,
        categoryChildren: CategoryChildrenResolver,
        courses: CourseResolver,
        getBookmarkedBlogs,
        getBookmarkedCourses,
        getBookmarkedProducts,
        getBasketDetails
    }
})
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForCourse,
        CreateCommentForProduct,
        LikeBlog,
        LikeProduct,
        LikeCourse,
        DisLikeBlog,
        DisLikeProduct,
        DisLikeCourse,
        BookmarkBlog,
        BookmarkProduct,
        BookmarkCourse,
        AddCourseToBasket,
        AddProductToBasket,
        RemoveCourseFromBasket,
        RemoveProductFromBasket,
    }
})
const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})
module.exports = {
    graphQLSchema
}