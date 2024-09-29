const { GraphQLList, GraphQLString } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { blogModel } = require("../../modules/admin/blog/blog.model")

const BlogResolver = {
    type: new GraphQLList(BlogType),
    args: { category: { type: GraphQLString } },
    resolve: async (_, args) => {
        const { category } = args
        const query = category ? { category } : {}
        return await blogModel.find(query).populate([
            { path: "author" },
            { path: "category" },
            { path: "comment.user" },
            { path: "comment.answer.user" },
            { path: "like" },
            { path: "bookmark" },
        ])
    }
}
module.exports = {
    BlogResolver
}