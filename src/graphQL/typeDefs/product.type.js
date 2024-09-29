const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const { PublicCategoryType, UserType } = require("./public.type");
const { CommentType } = require("./comment.type");
const FeatureType = new GraphQLObjectType({
    name: "featureType",
    fields: {
        colors: { type: new GraphQLList(GraphQLString) },
        height: { type: GraphQLString },
        width: { type: GraphQLString },
        weight: { type: GraphQLString },
        length: { type: GraphQLString },
        model: { type: new GraphQLList(GraphQLString) },
        madeIn: { type: GraphQLString }
    }
})
const ProductType = new GraphQLObjectType({
    name: "productType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        shortDesc: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        images: { type: new GraphQLList(GraphQLString) },
        imagesURL: { type: new GraphQLList(GraphQLString) },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType },
        supplier: { type: UserType },
        type: { type: GraphQLString }, // virtual - physical
        count: { type: GraphQLInt },
        discount: { type: GraphQLInt },
        format: { type: GraphQLString },
        feature: { type: FeatureType },
        comment: { type: new GraphQLList(CommentType) },
        like: { type: new GraphQLList(UserType) },
        dislike: {type: new GraphQLList(UserType)},
        bookmark: {type: new GraphQLList(UserType)},
    }
})
module.exports = {
    ProductType
}