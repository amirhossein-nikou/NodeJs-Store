const autoBind = require("auto-bind");
const { courseModel } = require("./course.model");
const categoryService = require("../category/category.service");
const { CourseMessages } = require("../../../common/enums/message.enum");
const { validateObjectId } = require("../../../common/utils/validate-object-id.utils");
const createHttpError = require("http-errors");
const { removeFile } = require("../../../common/utils/removeFile.utils");

class CourseService {
    #model
    #categoryService
    constructor() {
        autoBind(this)
        this.#model = courseModel
        this.#categoryService = categoryService
    }
    async getCourses(teacher, search) {
        let query = {}
        if (search) {
            query = {
                teacher,
                $text: {
                    $search: search
                }
            }
        } else (query = { teacher })
        return this.#model.find(query, {}, { sort: { _id: -1 } }).populate([
            { path: "category", select: { title: 1 } },
            { path: "teacher", select: { firstname: 1, lastname: 1, phone: 1, email: 1 } },
        ])
    }
    async createCourse(createDto) {
        let { title, shortDesc, description, discount, price, image, tags, type, category, teacher } = createDto
        let message = CourseMessages.CreatedFailed
        await this.#categoryService.findById(category)
        if (type === "free") {
            price = 0
            discount = 0
        }
        const course = await this.#model.create({
            title,
            shortDesc,
            description,
            price,
            discount,
            image,
            tags,
            type,
            category,
            teacher
        })
        if (course._id) message = CourseMessages.Created
        return message
    }
    async updateCourse(updateDto) {
        let { courseId, title, shortDesc, description, discount, price, image, tags, type, category, teacher } = updateDto
        const course = await this.getCourseById(courseId, teacher)
        if (category) await this.#categoryService.findById(category)
        if(tags.length == 0) tags = course.tags
        if(image || image !== "string" || image !== "") removeFile(course.image)
        if(!image || image === "string" || image === "") image = course.image
        if (type && type === "free") {
            price = 0
            discount = 0
        }
        let message = CourseMessages.Update
        const updateResult = await this.#model.updateOne({_id:courseId},{
             courseId, title, shortDesc, description, discount, price, image, tags, type, category
        })
        if(updateResult.modifiedCount == 0) message = CourseMessages.UpdateFailed
        return message
    }
    async getCourseById(id, teacher) {
        //check id
        validateObjectId(id)
        validateObjectId(teacher)
        const course = await this.#model.findOne({ _id: id, teacher })
        if (!course) throw new createHttpError.NotFound(CourseMessages.NotFound)
        return course
    }
}
module.exports = new CourseService()