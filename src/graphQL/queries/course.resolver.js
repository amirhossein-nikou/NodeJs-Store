const { GraphQLList, GraphQLString } = require("graphql")
const { courseModel } = require("../../modules/admin/course/course.model")
const { CourseType } = require("../typeDefs/course.type")
const CourseResolver = {
    type: new GraphQLList(CourseType),
    args: {category: { type: GraphQLString}},
    resolve: async (_,args) => {
        const {category} = args
        const query = category? {category} : {}
        return await courseModel.find(query).populate([
            { path: "teacher" },
            { path: "category" },
            { path: "comment.user" },
            { path: "comment.answer.user" },
            { path: "like" },
            { path: "bookmark" },
        ])
    }
}

module.exports = {
    CourseResolver
}