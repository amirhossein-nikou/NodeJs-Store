const {Schema,model,Types} = require("mongoose");

const  PaymentSchema= new Schema({
    invoiceNumber: {type: String,require: true},
    authority : {type: String},
    amount: {type: Number ,require: true},
    description: {type: String,default: "for buy new courses"},
    verify: {type: Boolean,default:false},
    user: {type: Types.ObjectId, ref: "user"},
    basket: {type: Object, default: {}},
    refId: { type: String },
    cardHash : {type: String},
}, {timestamps: {createdAt: true}})
const paymentModel = model("payment",PaymentSchema);
module.exports = {
    paymentModel
}