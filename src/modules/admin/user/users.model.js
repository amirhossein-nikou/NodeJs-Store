const { Schema, model, Types } = require("mongoose");
const BuyProductSchema = new Schema({
    productId: { type: Types.ObjectId, ref: "product" },
    count: { type: Number },
})
const BuyCourseSchema = new Schema({
    courseId: { type: Types.ObjectId, ref: "course" },
    count: { type: Number },
})
const BasketSchema = new Schema({
    products: { type: [BuyProductSchema], default: [] },
    courses: { type: [BuyCourseSchema], default: [] }
})
const UserSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, unique: true, lowercase: true },
    phone: { type: String, unique: true },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    verifyPhone: { type: Boolean, default: false },
    otp: {
        type: Object, default: {
            code: '',
            expiresIn: ''
        }
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    role: { type: String, default: "USER" },
    courses: { type: [Types.ObjectId], ref: "course", default: [] },
    products: { type: [Types.ObjectId], ref: "product", default: [] },
    token: { type: String},
    basket: { type: BasketSchema }
}, { timestamps: true, id: false, toJSON: { virtuals: true } })
UserSchema.index({ email: "text", phone: "text", username: "text", lastname: "text", firstname: "text" })

const userModel = model("user", UserSchema);
module.exports = {
    userModel
}