const createHttpError = require("http-errors")
const { blogModel } = require("../../modules/admin/blog/blog.model")
const { BlogMessages, CourseMessages, ProductMessages } = require("../enums/message.enum")
const { courseModel } = require("../../modules/admin/course/course.model")
const { productModel } = require("../../modules/admin/product/product.model")

async function checkExistsProduct(id){
    const product = await productModel.findById(id)
    if(!product) throw new createHttpError.NotFound(ProductMessages.NotFound)
    return product
}
async function checkExistsCourse(id){
    const course = await courseModel.findById(id)
    if(!course) throw new createHttpError.NotFound(CourseMessages.NotFound)
    return course
}
async function checkExistsBlog(id){
    const blog = await blogModel.findById(id)
    if(!blog) throw new createHttpError.NotFound(BlogMessages.NotFound)
    return blog
}
module.exports ={
    checkExistsCourse,
    checkExistsProduct,
    checkExistsBlog
}