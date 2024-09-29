const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");
const { PublicCategoryType, UserType } = require("./public.type");
const { CommentType } = require("./comment.type");
const EpisodeType = new GraphQLObjectType({
    name: "episodeType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        time: { type: GraphQLString },
        type: { type: GraphQLString },
        video: { type: GraphQLString },
        videoURL: { type: GraphQLString },
    }
})
const ChapterType = new GraphQLObjectType({
    name: "chapterType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        text: { type: GraphQLString },
        episode: { type: new GraphQLList(EpisodeType) },
    }
})
const CourseType = new GraphQLObjectType({
    name: "courseType",
    fields: {
        _id: { type: GraphQLString },
        title: { type: GraphQLString },
        shortDesc: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLInt },
        image: { type: GraphQLString},
        imageURL: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
        category: { type: PublicCategoryType },
        teacher: { type: UserType },
        type: { type: GraphQLString },
        totalTime: { type: GraphQLString },
        status: { type: GraphQLString },
        discount: { type: GraphQLInt },
        chapter: { type: new GraphQLList(ChapterType)},
        comment: {type: new GraphQLList(CommentType)},
        like: {type: new GraphQLList(UserType)},
        dislike: {type: new GraphQLList(UserType)},
        bookmark: {type: new GraphQLList(UserType)},

    }
})

module.exports = {
    CourseType
}