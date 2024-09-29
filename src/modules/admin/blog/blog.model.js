const { Schema, model, Types } = require("mongoose");
const { commentSchema } = require("../../../common/schema/comment.schema");
const BlogSchema = new Schema({
    author: { type: Types.ObjectId, ref:"user", required: true },
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    like: { type: [Types.ObjectId], ref: "user", default: [] },
    dislike: { type: [Types.ObjectId], ref: "user", default: [] },
    bookmark: { type: [Types.ObjectId], ref: "user", default: [] },
    comment: { type: [commentSchema], default: [] },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, ref: "category",required: true },
}, { timestamps: true, versionKey: false ,toJSON: {virtuals: true}})
// not work with aggregate
BlogSchema.virtual("user", {
    ref : "user",
    localField : "_id",
    foreignField: "author"
})
BlogSchema.virtual("category_detail", {
    ref : "category",
    localField : "_id",
    foreignField: "category"
})
BlogSchema.virtual("imageURL").get(function(){
    return `${process.env.HOST}:${process.env.PORT}/${this.image}`
})
const blogModel = model("blog", BlogSchema);
module.exports = {
    blogModel
}