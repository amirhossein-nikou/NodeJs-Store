const { Types, Schema, model, Cursor, get } = require("mongoose");
const { commentSchema } = require("../../../common/schema/comment.schema");
const { getTotalCourseTime } = require("../../../common/utils/getTime.utils");
const episodeSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, default: "unlock" },
    time: { type: String, required: true },
    video: { type: String, required: true },
}, {id:false ,toJSON: {virtuals: true}})
episodeSchema.virtual("videoURL").get(function(){
    return `${process.env.HOST}:${process.env.PORT}/${this.video}`
})
const ChapterSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, default: "" },
    episode: { type: [episodeSchema], default: [] },
})
const CourseSchema = new Schema({
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, ref: "category", required: true },
    like: { type: [Types.ObjectId],ref: "user" ,default: [] },
    dislike: { type: [Types.ObjectId],ref: "user", default: [] },
    bookmark: { type: [Types.ObjectId],ref: "user" ,default: [] },
    comment: { type: [commentSchema], default: [] },
    type: { type: String, required: true, default: "free" /* free , cash , special */ },
    status: { type: String, default: "notStarted" /* notStarted , complete , inProgress */ },
    time: { type: String, default: "00:00:00" },
    discount: { type: Number, default: 0 },
    teacher: { type: Types.ObjectId, ref: "user", required: true },
    chapter: { type: [ChapterSchema], default: [] },
    students: { type: [Types.ObjectId], ref: "user", default: [] },
}, {
    toJSON: {
        virtuals: true
    }
})
CourseSchema.index({ title: "text", shortDesc: "text", description: "text" })
CourseSchema.virtual("imageURL").get(function(){
    return `${process.env.HOST}:${process.env.PORT}/${this.image}`
})
CourseSchema.virtual("totalTime").get(function(){
    return getTotalCourseTime(this.chapter)
})
const courseModel = model("course", CourseSchema);
module.exports = {
    courseModel
}