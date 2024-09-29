const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLScalarType, GraphQLInt } = require("graphql");
const { toObject, parseLiteral } = require("../../common/utils/anytype.utils");
// const { CategoryType } = require("./category.type");

const UserType = new GraphQLObjectType({
    name: "userType",
    fields: {
        _id: { type: GraphQLString },
        firstname: { type: GraphQLString },
        lastname: { type: GraphQLString },
        username: { type: GraphQLString },
    }
})
const PublicCategoryType = new GraphQLObjectType({
    name: "publicCategoryType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        // children: {type: new GraphQLList(CategoryType)}
    }
})
const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue: toObject,
    serialize: toObject,
    parseLiteral: parseLiteral

})

const ResultType = new GraphQLObjectType({
    name: "resultType",
    fields: {
        statusCode: { type: GraphQLInt },
        data: { type: AnyType },
    }
})

module.exports = {
    UserType,
    PublicCategoryType,
    AnyType,
    ResultType
}