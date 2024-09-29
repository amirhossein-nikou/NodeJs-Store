const { GraphQLList, GraphQLString } = require("graphql");
const { ProductType } = require("../typeDefs/product.type");
const { productModel } = require("../../modules/admin/product/product.model");

const ProductResolver = {
    type: new GraphQLList(ProductType),
    args: { category: { type: GraphQLString } },
    resolve: async (_, args) => {
        const { category } = args
        const query = category ? { category } : {}
        return await productModel.find(query).populate([
            { path: "supplier" },
            { path: "category" },
            { path: "comment.user" },
            { path: "comment.answer.user" },
            { path: "like" },
            { path: "bookmark" },
        ])
    }
}
module.exports = {
    ProductResolver
}