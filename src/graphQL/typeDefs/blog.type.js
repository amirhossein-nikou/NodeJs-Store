const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.type");
const { CommentType } = require("./comment.type");

const BlogType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: { type: GraphQLString },
        author: { type: UserType },
        title: { type: GraphQLString },
        short_text: { type: GraphQLString},
        text: { type: GraphQLString},
        image: { type: GraphQLString },
        imageURL: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType},
        comment: {type: new GraphQLList(CommentType)},
        like: {type: new GraphQLList(UserType)},
        dislike: {type: new GraphQLList(UserType)},
        bookmark: {type: new GraphQLList(UserType)},
    }
})

module.exports = {
    BlogType
}