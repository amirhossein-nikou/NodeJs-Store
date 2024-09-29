const { Schema, model, Types } = require("mongoose");
const { commentSchema } = require("../../../common/schema/comment.schema");

const ProductSchema = new Schema({
    title: { type: String, required: true },
    shortDesc: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    images: { type: [String], required: true },
    tags: { type: [String], default: [] },
    category: { type: Types.ObjectId, ref: "category",required: true },
    supplier: { type: Types.ObjectId, ref: "user", required: true },
    like: { type: [Types.ObjectId],ref: "user" ,default: [] },
    dislike: { type: [Types.ObjectId],ref: "user", default: [] },
    bookmark: { type: [Types.ObjectId],ref: "user" ,default: [] },
    comment: { type: [commentSchema], default: [] },
    type: { type: String, required: true }, // virtual - physical
    count: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    format: { type: String },
    feature: {
        type: Object, default: {
            colors: [],
            height: "",
            width: "",
            weight: "",
            length: "",
            model: [],
            madeIn: ""
        }
    },
}, { toJSON: { virtuals: true } })
ProductSchema.virtual("imagesURL").get(function () {
    return this.images.map(image => `${process.env.HOST}:${process.env.PORT}/${image}`)
})
ProductSchema.index({ title: "text", shortDesc: "text", description: "text" })
const productModel = model("product", ProductSchema);
module.exports = {
    productModel
}