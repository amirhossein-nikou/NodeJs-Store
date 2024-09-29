const {Schema,model,Types} = require("mongoose");

const  CategorySchema= new Schema({
    title: {type: String, required: true},
    parent: {type:Types.ObjectId ,ref: "category", default: undefined}
},{
    toJSON: {
        virtuals: true
    },
    id: false
})
CategorySchema.virtual("children",{
    ref: "category",
    localField: "_id",
    foreignField: "parent"
})
function autoPopulate(){
    this.populate([{path: "children" , select: {__v: 0,id: 0}}])
}
CategorySchema.pre("find",autoPopulate).pre("findOne", autoPopulate)
const categoryModel = model("category",CategorySchema);
module.exports = {
    categoryModel
}