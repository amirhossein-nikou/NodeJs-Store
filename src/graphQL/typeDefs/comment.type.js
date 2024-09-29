const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType } = require("./public.type");
const CommentAnswerType = new GraphQLObjectType({
    name: "commentAnswerType",
    fields: {
        _id: { type: GraphQLString },
        user: { type: UserType },
        comment: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        openToReply: { type: GraphQLBoolean },
        createdAt: { type: GraphQLString }
    }
})
const CommentType = new GraphQLObjectType({
    name: "commentType",
    fields: {
        _id: { type: GraphQLString },
        user: { type: UserType },
        comment: { type: GraphQLString },
        show: { type: GraphQLBoolean },
        openToReply: { type: GraphQLBoolean },
        answer: { type: new GraphQLList(CommentAnswerType) },
        createdAt: { type: GraphQLString }
    }
})
module.exports = {
    CommentType
}