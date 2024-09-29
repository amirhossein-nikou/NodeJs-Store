const { GraphQLList, GraphQLString } = require("graphql");
const { CategoryType } = require("../typeDefs/category.type");
const categoryService = require("../../modules/admin/category/category.service");
const { validateAccessTokenInGraphQL } = require("../../common/middlewares/auth.middleware");

const CategoriesResolver = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        return await categoryService.findAll()
    }
}
const CategoryChildrenResolver = {
    type: new GraphQLList(CategoryType),
    args: {
        parentId: { type: GraphQLString }
    },
    resolve: async (_, args) => {
        const { parentId } = args
        return await categoryService.findChild(parentId)
    }
}
module.exports = {
    CategoriesResolver,
    CategoryChildrenResolver
}